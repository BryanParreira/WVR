export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  href: string
}

export interface PricingTier {
  id: string
  name: string
  price: number | string
  description: string
  features: string[]
  cta: string
  highlighted?: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar?: string
  rating: number
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}
