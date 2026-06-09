---
name: Sugar Plum v2
description: A magical e-commerce platform for an artisanal bakery.
colors:
  primary: "#C5A059"
  primary-light: "#E2CFAB"
  secondary: "#906B9A"
  plum: "#4A1E4D"
  background: "#FFF9F0"
typography:
  display:
    fontFamily: "var(--font-poppins), sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "var(--font-poppins), sans-serif"
    fontSize: "1rem"
    lineHeight: 1.5
rounded:
  full: "9999px"
  card: "2.5rem"
spacing:
  xs: "0.5rem"
  sm: "1rem"
  md: "1.5rem"
  lg: "2rem"
  xl: "3rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.plum}"
    rounded: "{rounded.full}"
    padding: "12px 32px"
  card-glass:
    backgroundColor: "rgba(255, 255, 255, 0.4)"
    rounded: "{rounded.card}"
    padding: "24px"
---

# Design System: Sugar Plum v2

## 1. Overview

**Creative North Star: "The Enchanted Larder"**

The Sugar Plum v2 design system is built to evoke a sense of "delicious wonder." It avoids the cold, clinical minimalism of modern SaaS, favoring soft curves, warm tones, and glassmorphic layers that feel like looking through a frosted bakery window. The system prioritizes sensory delight, aiming to make the user "hungry" through appetizing color palettes and fluid, organic motion.

**Key Characteristics:**
- Whimsical glassmorphism with soft blurs.
- Artisanal gold and plum tones.
- Extreme rounded corners for a soft, inviting feel.
- High-contrast typography that remains legible over textured backgrounds.

## 2. Colors

The "Enchanted Larder" palette is warm, rich, and appetizing, inspired by natural ingredients like gold honey and ripe plums.

### Primary
- **Artisanal Sun** (#C5A059): The core brand color, used for primary actions and brand highlights. It represents quality and artisanal craft.

### Secondary
- **Dusk Plum** (#906B9A): A muted, magical lavender used for secondary accents and decorative elements.

### Neutral
- **Midnight Currant** (#4A1E4D): The primary ink color for text and deep shadows.
- **Sugar Base** (#FFF9F0): A creamy vanilla background that provides a warm alternative to clinical white.

### Named Rules
**The Rarity Rule.** Artisanal Sun is a precious metal. Use it on no more than 10% of any given screen to ensure it remains a point of focus and delight.

## 3. Typography

**Display Font:** Poppins (Bold)
**Body Font:** Poppins (Regular/Medium)

**Character:** The typography is confident yet friendly, utilizing tight tracking on headings for a modern "product" feel while maintaining generous line heights for body copy.

### Hierarchy
- **Display** (700, clamp(2.5rem, 5vw, 4rem), 1.1): Used for hero headlines.
- **Headline** (600, 2rem, 1.2): Used for section titles.
- **Body** (400, 1rem, 1.5): Used for prose and descriptions. Max line length 65ch.
- **Label** (700, 0.875rem, uppercase): Used for buttons and badges.

## 4. Elevation

The system uses a "Glass Larder" approach to depth, favoring transparency and blur over heavy shadows.

### Shadow Vocabulary
- **Whimsical Glow** (0 10px 30px rgba(74, 30, 77, 0.1)): A soft, plum-tinted shadow used to lift cards and buttons without feeling "heavy."

### Named Rules
**The Frosted Window Rule.** Depth is created through layers of white transparency (bg-white/40) and backdrop-blurs (backdrop-blur-md). Shadows are secondary to transparency.

## 5. Components

### Buttons
- **Shape:** Full pill (rounded-full)
- **Primary:** Artisanal Sun background with Midnight Currant text.
- **Hover:** Subtle scale-down (active:scale-95) and increased shadow.

### Cards
- **Corner Style:** Extremely rounded (2.5rem).
- **Glass Variant:** bg-white/40 with backdrop-blur-md and a 1px white border (border-white/60).

## 6. Do's and Don'ts

### Do:
- **Do** use `rounded-[2.5rem]` for all major containers and cards.
- **Do** use `text-plum` (Midnight Currant) for all body text on `bg-background` (Sugar Base) for high legibility.
- **Do** apply `backdrop-blur-md` whenever using semi-transparent backgrounds.

### Don't:
- **Don't** use sharp corners (radius < 12px) anywhere in the UI.
- **Don't** use pure grayscale (#000, #FFF, #888). Always tint neutrals toward the brand hue.
- **Don't** use "AI Cream" (generic beige) without the brand-specific gold and plum accents.
- **Don't** use clinical, corporate icons. Keep iconography soft and illustrative where possible.
