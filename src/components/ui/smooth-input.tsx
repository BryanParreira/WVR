"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import React, {
  type ComponentPropsWithoutRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

type SmoothInputType = "text" | "password" | "email" | "tel" | "url" | "search";

type SmoothInputProps = Omit<ComponentPropsWithoutRef<"input">, "type"> & {
  type?: SmoothInputType;
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  springConfig?: { stiffness: number; damping: number; mass: number };
};

const DEFAULT_SPRING = { stiffness: 500, damping: 30, mass: 0.5 };

// Lazy: avoids SSR crash since navigator doesn't exist on server
const getPasswordChar = () =>
  typeof navigator !== "undefined" && /firefox|fxios/i.test(navigator.userAgent)
    ? "●"
    : "•";

const SmoothInput = React.forwardRef<HTMLInputElement, SmoothInputProps>(
  (
    {
      className,
      wrapperClassName,
      wrapperStyle,
      value,
      defaultValue,
      onChange,
      onBlur,
      type = "text",
      springConfig = DEFAULT_SPRING,
      ...props
    },
    forwardedRef,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");

    const caretX = useMotionValue(0);
    const caretOpacity = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const measureRef = useRef<HTMLSpanElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const mergedRef = useCallback(
      (node: HTMLInputElement | null) => {
        (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
      },
      [forwardedRef],
    );

    const springCaretX = useSpring(
      caretX,
      prefersReducedMotion
        ? { stiffness: 10000, damping: 100, mass: 0.1 }
        : springConfig,
    );

    const inputValue = isControlled ? String(value) : internalValue;

    const syncMeasureSpan = () => {
      const input = inputRef.current;
      const span = measureRef.current;
      if (!input || !span) return;

      const s = window.getComputedStyle(input);
      const isPassword = input.type === "password";

      let fontSize = s.fontSize;
      if (
        getPasswordChar() === "•" &&
        isPassword &&
        !/chrome|chromium|crios/i.test(navigator.userAgent)
      ) {
        fontSize = `${parseFloat(fontSize) + 6.25}px`;
      }

      span.style.font = `${s.fontStyle} ${s.fontWeight} ${fontSize} ${s.fontFamily}`;
      span.style.letterSpacing = s.letterSpacing;
      span.style.fontFeatureSettings = s.fontFeatureSettings;
      span.style.fontVariationSettings = s.fontVariationSettings;
    };

    const measurePrefixWidth = (text: string) => {
      const input = inputRef.current;
      const span = measureRef.current;
      if (!input || !span) return null;

      syncMeasureSpan();
      span.textContent = text;

      const paddingLeft = parseFloat(window.getComputedStyle(input).paddingLeft) || 0;
      return text.length > 0 ? span.offsetWidth + paddingLeft : paddingLeft - 1;
    };

    const scrollCaretIntoView = (target: HTMLInputElement, absoluteWidth: number) => {
      const s = window.getComputedStyle(target);
      const paddingLeft = parseFloat(s.paddingLeft) || 0;
      const paddingRight = parseFloat(s.paddingRight) || 0;
      const maxScroll = Math.max(0, target.scrollWidth - target.clientWidth);
      const visibleRight = target.scrollLeft + target.clientWidth - paddingRight;
      const visibleLeft = target.scrollLeft + paddingLeft;

      if (absoluteWidth > visibleRight) {
        target.scrollLeft = Math.min(absoluteWidth - target.clientWidth + paddingRight, maxScroll);
        return;
      }
      if (absoluteWidth < visibleLeft) {
        target.scrollLeft = Math.max(0, absoluteWidth - paddingLeft);
      }
    };

    const getCaretIndex = (target: HTMLInputElement) => {
      try {
        const start = target.selectionStart ?? 0;
        const end = target.selectionEnd ?? 0;
        if (start === end) return start;
        return target.selectionDirection === "backward" ? start : end;
      } catch {
        return 0;
      }
    };

    const updateCaretFromInput = (target: HTMLInputElement) => {
      let start = 0, end = 0;
      try {
        start = target.selectionStart ?? 0;
        end = target.selectionEnd ?? 0;
      } catch {
        // email/number/date inputs don't support selectionStart — hide caret
        caretOpacity.set(0);
        return;
      }
      const hasSelection = start !== end;
      const caretIndex = getCaretIndex(target);
      const isPassword = target.type === "password";
      const textBeforeCaret = isPassword
        ? getPasswordChar().repeat(caretIndex)
        : target.value.slice(0, caretIndex);

      const absoluteWidth = measurePrefixWidth(textBeforeCaret);
      if (absoluteWidth === null) return;

      scrollCaretIntoView(target, absoluteWidth);

      const s = window.getComputedStyle(target);
      const paddingLeft = parseFloat(s.paddingLeft) || 0;
      const paddingRight = parseFloat(s.paddingRight) || 0;
      const caretPosition = absoluteWidth - target.scrollLeft;
      const minX = paddingLeft - 1;
      const maxX = target.clientWidth - paddingRight;
      const isCaretVisible = caretPosition >= minX && caretPosition <= maxX + 1;

      caretX.set(Math.min(caretPosition, maxX));

      if (!isCaretVisible || hasSelection) {
        caretOpacity.set(0);
        return;
      }
      caretOpacity.set(1);
    };

    const updateCaretRef = useRef(updateCaretFromInput);
    updateCaretRef.current = updateCaretFromInput;
    const caretOpacityRef = useRef(caretOpacity);
    caretOpacityRef.current = caretOpacity;

    useEffect(() => {
      const input = inputRef.current;
      if (input && document.activeElement === input) updateCaretRef.current(input);
    }, [inputValue]);

    useEffect(() => {
      const input = inputRef.current;
      const container = containerRef.current;
      if (!input || !container) return;

      const updateIfFocused = () => {
        if (document.activeElement === input) updateCaretRef.current(input);
      };

      const handleSelectionChange = () => {
        if (document.activeElement !== input) return;
        requestAnimationFrame(() => {
          if (document.activeElement === input) updateCaretRef.current(input);
        });
      };

      document.addEventListener("selectionchange", handleSelectionChange);
      document.fonts.addEventListener("loadingdone", updateIfFocused);
      void document.fonts.ready.then(updateIfFocused);
      input.addEventListener("scroll", updateIfFocused);

      const observer = new ResizeObserver(updateIfFocused);
      observer.observe(container);

      updateIfFocused();

      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
        document.fonts.removeEventListener("loadingdone", updateIfFocused);
        input.removeEventListener("scroll", updateIfFocused);
        observer.disconnect();
      };
    }, []);

    return (
      <div
        ref={containerRef}
        className={cn("relative grid grid-cols-1", wrapperClassName)}
        style={{ caretColor: "transparent", ...wrapperStyle }}
      >
        <input
          {...props}
          ref={mergedRef}
          type={type}
          className={cn(
            "col-start-1 col-end-2 row-start-1 row-end-2 border-0 bg-transparent outline-none ring-0 focus:outline-none focus:ring-0",
            className,
          )}
          value={inputValue}
          onChange={(e) => {
            if (!isControlled) setInternalValue(e.target.value);
            onChange?.(e);
            requestAnimationFrame(() => updateCaretRef.current(e.target));
          }}
          onBlur={(e) => {
            caretOpacityRef.current.set(0);
            onBlur?.(e);
          }}
          onFocus={(e) => {
            updateCaretRef.current(e.target);
            props.onFocus?.(e);
          }}
          onMouseUp={(e) => {
            requestAnimationFrame(() => updateCaretRef.current(e.currentTarget));
            props.onMouseUp?.(e);
          }}
          onKeyUp={(e) => {
            updateCaretRef.current(e.currentTarget as HTMLInputElement);
            props.onKeyUp?.(e);
          }}
        />
        <span
          ref={measureRef}
          aria-hidden
          className="pointer-events-none invisible absolute top-0 left-0 whitespace-pre"
        />
        <motion.div
          className="pointer-events-none col-start-1 col-end-2 row-start-1 row-end-2 h-[1.1em] w-px self-center"
          style={{
            x: springCaretX,
            opacity: caretOpacity,
            backgroundColor: "currentColor",
          }}
        />
      </div>
    );
  },
);

SmoothInput.displayName = "SmoothInput";

export { SmoothInput };
