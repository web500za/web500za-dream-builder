# Zen Browser Authentic Color Palette

## Extracted Colors from zen-browser.app

### Light Mode
- **Background**: `#D1CFC0` - Light warm gray (hsl(52,15%,78%))
- **Accent**: `#F76F53` - Coral/salmon (hsl(10,91%,64%))
- **Text Primary**: `#1F1F1F` - Near black (hsl(0,0%,12%))
- **Text Secondary**: `#2E2E2E` - Dark slate gray (hsl(0,0%,18%))

### Dark Mode Usage
- **Background**: `#1F1F1F` - Near black becomes background
- **Cards**: `#2E2E2E` - Dark slate gray for elevated surfaces
- **Accent**: `#F76F53` - Same coral works in both modes
- **Text**: `#D1CFC0` - Light gray becomes text color

## How We're Using Them

### Light Mode Mapping
```css
--bg-primary: #D1CFC0;          /* Zen's light gray background */
--bg-secondary: #FFFFFF;        /* Pure white cards for contrast */
--text-primary: #1F1F1F;        /* Zen's near-black text */
--text-secondary: #2E2E2E;      /* Zen's dark slate gray */
--brand-accent: #F76F53;        /* Zen's exact coral */
```

### Dark Mode Mapping  
```css
--bg-primary: #1F1F1F;          /* Zen's black as background */
--bg-secondary: #2E2E2E;        /* Zen's slate as cards */
--text-primary: #D1CFC0;        /* Zen's light gray as text */
--brand-accent: #F76F53;        /* Same coral, works in dark */
```

## Color Psychology
- **Warm Gray (#D1CFC0)**: Calm, sophisticated, less stark than pure white
- **Coral (#F76F53)**: Energetic but warm, perfect accent for "calmer internet"
- **Near Black (#1F1F1F)**: Readable without being harsh pure black
- **Dark Slate (#2E2E2E)**: Perfect mid-tone for secondary text

This palette creates the exact same warm, minimal, sophisticated feeling as Zen Browser.