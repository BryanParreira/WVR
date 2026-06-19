"use client";
// "use no memo" — prevents React Compiler from memoizing refs/effects used by GSAP

import { gsap } from "gsap";
import React, { useEffect, useRef } from "react";

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
  className?: string;
  excludeIndices?: number[];
}

const CrowdCanvas = ({ src, rows = 15, cols = 7, className, excludeIndices }: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = { src, rows, cols };

    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
    const randomIndex = (array: unknown[]) => (randomRange(0, array.length) | 0);
    const removeFromArray = (array: unknown[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: unknown[], item: unknown) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: unknown[]) =>
      removeFromArray(array, randomIndex(array));

    type Peep = {
      image: HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      walk: any;
      setRect: (rect: number[]) => void;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    const stage = { width: 0, height: 0 };
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeep = ({ image, rect }: { image: HTMLImageElement; rect: number[] }): Peep => {
      const peep: Peep = {
        image, rect: [], width: 0, height: 0, x: 0, y: 0, anchorY: 0, scaleX: 1, walk: null,
        setRect(r) {
          peep.rect = r;
          peep.width = r[2];
          peep.height = r[3];
        },
        render(ctx) {
          ctx.save();
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, 1);
          ctx.drawImage(peep.image, peep.rect[0], peep.rect[1], peep.rect[2], peep.rect[3], 0, 0, peep.width, peep.height);
          ctx.restore();
        },
      };
      peep.setRect(rect);
      return peep;
    };

    const resetPeep = ({ peep }: { peep: Peep }) => {
      // Scale to 35–55 % of canvas height — gives crowd density, not giant figures
      const scaleFactor = (0.35 + Math.random() * 0.20) * stage.height / peep.rect[3];
      peep.height = peep.rect[3] * scaleFactor;
      peep.width  = peep.rect[2] * scaleFactor;

      const direction = Math.random() > 0.5 ? 1 : -1;
      // Small Y jitter so peeps appear at slightly different ground levels (depth)
      const offsetY   = randomRange(-peep.height * 0.08, peep.height * 0.04);
      const startY    = stage.height - peep.height + offsetY;
      let startX: number, endX: number;

      if (direction === 1) {
        startX = -peep.width; endX = stage.width; peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width; endX = 0; peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;
      return { startX, startY, endX };
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps) as Peep;
      const props = resetPeep({ peep });
      const { startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(peep, { duration: xDuration, x: endX, ease: "none" }, 0);
      tl.to(peep, { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: startY - 10 }, 0);
      tl.eventCallback("onComplete", () => {
        removeItemFromArray(crowd, peep);
        availablePeeps.push(peep);
        addPeepToCrowd();
      });

      peep.walk = tl;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);
      return peep;
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      crowd.forEach(p => p.render(ctx));
      ctx.restore();
    };

    let started = false;

    const resize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return; // skip until layout is ready
      const dpr = window.devicePixelRatio || 1;
      stage.width = w;
      stage.height = h;
      canvas.width = w * dpr;
      canvas.height = h * dpr;

      crowd.forEach(p => p.walk?.kill());
      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);
      while (availablePeeps.length) addPeepToCrowd().walk.progress(Math.random());

      if (!started) {
        started = true;
        gsap.ticker.add(render);
      }
    };

    const img = document.createElement("img");
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const { naturalWidth: w, naturalHeight: h } = img;
      const total = config.rows * config.cols;
      const rw = w / config.rows;
      const rh = h / config.cols;

      for (let i = 0; i < total; i++) {
        if (excludeIndices?.includes(i)) continue;
        allPeeps.push(createPeep({
          image: img,
          rect: [(i % config.rows) * rw, ((i / config.rows) | 0) * rh, rw, rh],
        }));
      }

      resize();
    };
    img.onerror = () => {
      // Try without crossOrigin if CORS fails (same-origin images)
      img.crossOrigin = "";
      img.src = config.src;
    };
    img.src = config.src;

    // ResizeObserver catches both initial layout paint and future resizes
    const ro = new ResizeObserver(() => {
      if (allPeeps.length > 0) resize();
    });
    ro.observe(canvas);

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      ro.disconnect();
      gsap.ticker.remove(render);
      crowd.forEach(p => p.walk?.kill());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src, rows, cols]);

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "absolute bottom-0 left-0 h-full w-full"}
    />
  );
};

export { CrowdCanvas };
