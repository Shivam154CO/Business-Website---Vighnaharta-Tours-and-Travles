# UI/UX Audit Report — Shree Vighnaharta Travels

**Project:** `C:\Users\Admin\Desktop\Vighnaharta\vighnaharta-travels`
**Stack:** Next.js 16.4.3, React 19.3.0, Tailwind CSS v4, Framer Motion, Lucide React
**Audit Date:** 2026-11-03

---

## Executive Summary

The site is functionally complete and builds cleanly, but the UI has a distinctly **AI-generated / template feel** that undermines trust for a travel business. Key issues: overuse of emojis in place of proper icons, glassmorphism on every surface, floating animated orbs, inconsistent data between two constant files, missing image cards on route/service pages, and no responsive image optimization.

---

## 1. Visual Design & Branding

### Issues

| # | Issue | Severity | Location |
|---|-------|----------|----------|
| 1.1 | **Emojis used instead of proper icons** — emojis (🚗, 🕒, ⭐, 📞, ✉️, 🕒, 🎒) appear on About, Hero, VehicleCard, Footer. Looks informal and untrustworthy for a travel brand. | High | about/page.tsx, HeroSection.tsx, VehicleCard.tsx, Footer.tsx, Testimonials.tsx, StatsCounter.tsx |
| 1.2 | **Glassmorphism overused** — every card uses `GlassCard` with `bg-black/30` blur, creating visual noise and poor readability. | Medium | GlassCard.tsx used everywhere |
| 1.3 | **Floating animated orbs** — decorative blur orbs in Hero section look like a generic AI template, not a travel brand. | Medium | HeroSection.tsx |
| 1.4 | **Generic dark-blue/gold color palette** — indistinguishable from hundreds of AI-generated startup sites. No unique brand identity. | Medium | globals.css @theme |
| 1.5 | **No hero imagery** — hero is text-only with animated orbs. Travel is visual; missing destination photography kills emotional appeal. | High | HeroSection.tsx |
| 1.6 | **Inconsistent typography** — Geist font in layout.tsx vs Outfit/Inter in globals.css creates font mismatch. | Low | layout.tsx, globals.css |
| 1.7 | **No clear visual hierarchy** — all section titles use the same style, cards have equal weight, nothing guides the eye to primary actions. | Medium | SectionTitle.tsx, all page sections |

### Recommendations

- Replace all emojis with **lucide-react** vector icons (Car, MapPin, Calendar, Users, Clock, Star, Shield, Truck, Phone, Mail, ArrowRight, etc.)
- Use **solid surface cards** with subtle borders instead of glass everywhere; reserve glass for overlays/hero only
- Add **real destination/vehicle photography** to hero, route cards, service cards, and fleet cards
- Establish a clear **visual hierarchy**: primary CTA (gold), secondary (outline), tertiary (text)
- Use **Next.js Image component** for optimized, responsive images with lazy loading

---

## 2. Components & Layout

### Issues

| # | Issue | Severity | Location |
|---|-------|----------|----------|
| 2.1 | **Route cards are image-less text links** — PopularRoutes section shows no destination photos, just route name/distance/price. | High | PopularRoutes.tsx, RouteCard.tsx (has image but basic) |
| 2.2 | **Service cards have no imagery** — just icons and text; no visual representation of the service. | Medium | ServicesGrid.tsx |
| 2.3 | **Fleet cards use emojis instead of vehicle photos** — VehicleCard shows 🚗/🚌 emoji, not actual vehicle images. | High | VehicleCard.tsx |
| 2.4 | **GlassCard references undefined CSS class** — `.glass-card` is not defined in globals.css (only `.glass` and `.glass-light` exist). | Medium | GlassCard.tsx, globals.css |
| 2.5 | **No image optimization** — `` tags used in Testimonials.tsx and RouteCard.tsx instead of `<Image />` from next/image. | Medium | Testimonials.tsx, RouteCard.tsx |
| 2.6 | **Duplicate/inconsistent data** — `constants/routes.ts` and `constants/data.ts` both define POPULAR_ROUTES, SERVICES, TESTIMONIALS with different shapes. | Medium | constants/routes.ts, constants/data.ts |
| 2.7 | **MobileMenu WhatsApp URL double-encoded** — `SITE.whatsapp` is already a full `https://wa.me/...` URL but is wrapped in `https://wa.me/${...}` again. | Low | MobileMenu.tsx |
| 2.8 | **No loading/skeleton states** — booking widget and fleet filter show empty states without skeleton loaders. | Low | book/page.tsx, FleetPreview.tsx |

### Recommendations

- Add **destination images** to RouteCard and PopularRoutes
- Add **vehicle photographs** to VehicleCard and FleetPreview
- Add **service imagery** or illustrated cards to ServicesGrid
- Fix GlassCard to use defined CSS classes (`.glass` or `.glass-light`)
- Replace all `` with `<Image />` from next/image with proper `width`, `height`, `priority`, `placeholder="blur"`
- Consolidate data into a single source of truth (use `routes.ts`, deprecate `data.ts`)
- Fix MobileMenu WhatsApp URL to use `SITE.whatsapp` directly

---

## 3. UX & Interaction

### Issues

| # | Issue | Severity | Location |
|---|-------|----------|----------|
| 3.1 | **Contact form does nothing** — `onSubmit={(e) => e.preventDefault()}` with no form handler, no validation, no success/error state. | High | contact/page.tsx |
| 3.2 | **Booking widget is read-only** — From/To/Date/Passengers are display chips, not actual inputs. User cannot book from homepage. | High | HeroSection.tsx |
| 3.3 | **No form validation** — booking form has no required field validation, no error messages. | High | book/page.tsx |
| 3.4 | **No date picker** — Date shown as static "Today" chip. | Medium | HeroSection.tsx |
| 3.5 | **WhatsApp links hardcoded** — CTABanner and WhatsAppFloat hardcode phone number instead of using SITE constant. | Low | CTABanner.tsx, WhatsAppFloat.tsx |
| 3.6 | **No "back to top" on long pages** — About and Services pages are long with no quick navigation. | Low | about/page.tsx, services/page.tsx |
| 3.7 | **Testimonials auto-rotate without pause on hover** — carousel keeps moving, hard to read. | Medium | Testimonials.tsx |

### Recommendations

- Implement **working contact form** with validation, submission handler, and toast feedback
- Make **hero booking widget functional** with real inputs, date picker, and fare estimate
- Add **client-side form validation** with clear error messages
- Add **pause-on-hover** to testimonial carousel
- Use `SITE` constants for all WhatsApp/phone/email references
- Add **back-to-top** button on long pages

---

## 4. Accessibility

| # | Issue | Severity | Location |
|---|-------|----------|----------|
| 4.1 | **Low contrast text** — `text-text-muted` (#8899BB) on dark backgrounds may fail WCAG AA for small text. | Medium | globals.css, multiple components |
| 4.2 | **Missing ARIA labels** — icon buttons, nav menu, carousel dots lack `aria-label`. | Medium | Navbar.tsx, MobileMenu.tsx, Testimonials.tsx |
| 4.3 | **No focus-visible styles** — keyboard navigation has no clear focus indicator. | Low | all interactive elements |
| 4.4 | **Images without alt text** — some `` tags may lack meaningful alt attributes. | Low | Testimonials.tsx, RouteCard.tsx |

---

## 5. Performance

| # | Issue | Severity | Location |
|---|-------|----------|----------|
| 5.1 | **Unoptimized images** — Unsplash URLs served at full resolution, no next/image optimization. | Medium | StatsCounter.tsx, Testimonials.tsx, RouteCard.tsx |
| 5.2 | **IntersectionObserver on every stat card** — separate observer per card instead of one shared observer. | Low | StatsCounter.tsx |
| 5.3 | **setInterval in client components** — HeroSection and Testimonials run timers even when tab is backgrounded. | Low | HeroSection.tsx, Testimonials.tsx |

---

## 6. Code Quality

| # | Issue | Severity | Location |
|---|-------|----------|----------|
| 6.1 | **clsx/tailwind-merge not in package.json** — used in utils.ts but not declared as dependencies. | Low | utils.ts, package.json |
| 6.2 | **Dead code** — `constants/data.ts` is unused (duplicates routes.ts). | Low | constants/data.ts |
| 6.3 | **Unused imports previously fixed** — all now resolved. | — | — |

---

## Priority Fixes (Implementation Order)

1. **Critical:** Replace emojis with lucide-react icons across all components
2. **Critical:** Add destination/vehicle images to cards (RouteCard, VehicleCard, ServicesGrid)
3. **Critical:** Fix contact form to actually work with validation
4. **High:** Make hero booking widget functional with real inputs
5. **High:** Fix GlassCard undefined CSS class
6. **Medium:** Consolidate duplicate data sources
7. **Medium:** Replace `` with `<Image />` for optimization
8. **Low:** Fix MobileMenu WhatsApp double-encoding
9. **Low:** Add aria-labels and focus styles for accessibility

---
