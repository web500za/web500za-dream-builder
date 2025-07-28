# Web500za Design System

## Typography

### Font Stack
- **Primary**: Inter (sans-serif) - clean, modern, excellent readability
- **Fallback**: system-ui, -apple-system, sans-serif

### Type Scale
- **Hero**: 72px (4.5rem) - "welcome to"
- **Hero Accent**: 72px (4.5rem) - "professional web design" 
- **Section Title**: 48px (3rem) - "Productivity at its best"
- **Card Title**: 24px (1.5rem)
- **Body Large**: 18px (1.125rem)
- **Body**: 16px (1rem)
- **Caption**: 14px (0.875rem)

### Font Weights
- Light: 300 (hero text)
- Regular: 400 (body)
- Medium: 500 (UI elements)
- Semibold: 600 (section titles)
- Bold: 700 (emphasis)

## Color Palette

### Light Mode
```css
/* Backgrounds */
--bg-primary: #FAF8F3;        /* Warm off-white (like Zen's beige) */
--bg-secondary: #FFFFFF;      /* Pure white for cards */
--bg-tertiary: #F5F3EE;       /* Slightly darker beige for sections */

/* Text */
--text-primary: #1A1A1A;      /* Almost black for main text */
--text-secondary: #4A4A4A;    /* Muted gray for secondary text */
--text-tertiary: #6B6B6B;     /* Lighter gray for captions */

/* Brand Colors */
--brand-primary: #2D5A3D;     /* Your existing brand green */
--brand-accent: #E55A3C;      /* Warm red-orange like Zen's "calmer" */
--brand-accent-hover: #D04A2C;

/* UI Elements */
--border-default: #E5E5E5;    /* Light gray borders */
--border-hover: #D0D0D0;
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.04);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.12);
```

### Dark Mode
```css
/* Backgrounds */
--bg-primary: #0F0F0F;        /* Near black */
--bg-secondary: #1A1A1A;      /* Slightly lighter for cards */
--bg-tertiary: #232323;       /* For elevated sections */

/* Text */
--text-primary: #FAFAFA;      /* Almost white for main text */
--text-secondary: #B8B8B8;    /* Muted light gray */
--text-tertiary: #888888;     /* Darker gray for captions */

/* Brand Colors */
--brand-primary: #4A7C59;     /* Lighter green for dark mode */
--brand-accent: #FF6B4A;      /* Brighter orange-red for contrast */
--brand-accent-hover: #FF5A38;

/* UI Elements */
--border-default: #2A2A2A;    /* Dark gray borders */
--border-hover: #404040;
--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.5);
```

## Spacing System
```css
--space-xs: 0.25rem;   /* 4px */
--space-sm: 0.5rem;    /* 8px */
--space-md: 1rem;      /* 16px */
--space-lg: 1.5rem;    /* 24px */
--space-xl: 2rem;      /* 32px */
--space-2xl: 3rem;     /* 48px */
--space-3xl: 4rem;     /* 64px */
--space-4xl: 6rem;     /* 96px */
--space-5xl: 8rem;     /* 128px */
```

## Border Radius
```css
--radius-sm: 0.375rem;   /* 6px - buttons, inputs */
--radius-md: 0.75rem;    /* 12px - cards */
--radius-lg: 1rem;       /* 16px - modals, large cards */
--radius-xl: 1.5rem;     /* 24px - hero sections */
--radius-full: 9999px;   /* Pills, circular elements */
```

## Animation
```css
/* Easing Functions */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);

/* Durations */
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;

/* Transitions */
--transition-all: all var(--duration-normal) var(--ease-in-out);
--transition-colors: background-color, border-color, color var(--duration-fast) var(--ease-in-out);
--transition-transform: transform var(--duration-normal) var(--ease-out);
```

## Components

### Buttons
```css
/* Primary Button */
.btn-primary {
  background: var(--brand-primary);
  color: white;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-sm);
  font-weight: 500;
  transition: var(--transition-all);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-default);
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-sm);
  font-weight: 500;
}

/* Accent Button (CTA) */
.btn-accent {
  background: var(--brand-accent);
  color: white;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-sm);
  font-weight: 600;
}
```

### Cards
```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: var(--space-xl);
  box-shadow: var(--shadow-sm);
  transition: var(--transition-all);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### Layout
```css
/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

/* Section Spacing */
.section {
  padding: var(--space-5xl) 0;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
```

## Breakpoints
```css
--screen-sm: 640px;
--screen-md: 768px;
--screen-lg: 1024px;
--screen-xl: 1280px;
--screen-2xl: 1536px;
```

## Z-Index Scale
```css
--z-base: 0;
--z-dropdown: 1000;
--z-sticky: 1020;
--z-fixed: 1030;
--z-modal-backdrop: 1040;
--z-modal: 1050;
--z-popover: 1060;
--z-tooltip: 1070;
```

## Usage Example

### Hero Section (Light Mode)
```html
<section class="hero" style="background: var(--bg-primary)">
  <h1 style="color: var(--text-primary); font-weight: 300">
    welcome to
  </h1>
  <h1 style="color: var(--text-primary)">
    professional <span style="color: var(--brand-accent)">web design</span>
  </h1>
  <p style="color: var(--text-secondary)">
    Bringing Fortune 500 quality to local businesses
  </p>
  <button class="btn-accent">Get Started</button>
</section>
```

### Dark Mode Toggle
The dark mode colors will be applied when the `<html>` element has a `class="dark"` or `data-theme="dark"` attribute.