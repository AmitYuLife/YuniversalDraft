# Typography Migration: Display/Heading → H1-H5

## Summary
Migrated from "Display XL/LG/MD" and "Heading XL/LG" naming to standard web-friendly H1-H5 hierarchy with consistent line-height ratios across all breakpoints.

## Date
February 13, 2026

## Changes Made

### 1. Figma Variables (Typography Collection)
**Renamed Variables:**
- `display/xl` → `h1` (Hero headlines)
- `display/lg` → `h2` (Section headlines)
- `display/md` → `h3` (Subsection headlines)
- `heading/xl` → `h4` (Large headings)
- `heading/lg` → `h5` (Medium headings)

**Updated Line Heights (Consistent Ratios):**

| Level | Desktop | Tablet | Mobile | Target Ratio |
|-------|---------|--------|--------|--------------|
| **H1** | 120px → 96px | 80px → 64px | 56px → 48px | 0.80x (very tight) |
| **H2** | 80px → 64px | 56px → 48px | 40px → 32px | 0.80x (very tight) |
| **H3** | 56px → 48px | 40px → 32px | 32px → 24px | 0.80-0.86x (tight) |
| **H4** | 40px → 48px | 32px → 40px | 28px → 32px | 1.20x (moderate) |
| **H5** | 32px → 40px | 28px → 32px | 24px → 32px | 1.25x (comfortable) |

### 2. Codebase Updates

**Files Modified:**
- ✅ `src/app/globals.css` - Updated CSS custom properties and Tailwind utilities
- ✅ `src/design-system/tokens/typography.ts` - Updated textStyles to H1-H5
- ✅ `src/components/sections/HeroSection.tsx` - `text-display-xl` → `text-h1`
- ✅ `src/components/sections/ExperienceSection.tsx` - `text-display-lg` → `text-h2`
- ✅ `src/components/sections/ProofSection.tsx` - `text-display-lg` → `text-h2`
- ✅ `src/components/sections/YunitySection.tsx` - `text-display-lg` → `text-h2`
- ✅ `src/components/sections/IntroSection.tsx` - `text-display-lg` → `text-h2`, `text-display-md` → `text-h3`
- ✅ `src/components/sections/TrustSection.tsx` - `text-heading-xl` → `text-h4`

### 3. New Tailwind Classes Available
```css
/* Hero & Display Headlines */
text-h1  /* 120px/96px → 80px/64px → 56px/48px */
text-h2  /* 80px/64px → 56px/48px → 40px/32px */
text-h3  /* 56px/48px → 40px/32px → 32px/24px */

/* Section Headings */
text-h4  /* 40px/48px → 32px/40px → 28px/32px */
text-h5  /* 32px/40px → 28px/32px → 24px/32px */
```

### 4. Line Height Philosophy
- **H1-H2**: 0.80x ratio (very tight for impactful hero text)
- **H3**: 0.80-0.86x ratio (tight but slightly looser)
- **H4-H5**: 1.20-1.25x ratio (moderate to comfortable for readability)
- All values align to 8px spacing grid

## Benefits
1. ✅ **Web Standards**: Standard H1-H5 hierarchy matches HTML semantics
2. ✅ **Consistent Ratios**: Predictable line-height behavior across breakpoints
3. ✅ **Tighter Typography**: Reduced line heights create more impactful headlines
4. ✅ **Better DX**: Easier to remember (h1, h2, h3 vs display-xl, display-lg)
5. ✅ **Full Hierarchy**: Now have H4 and H5 for complete heading scale

## Testing
🌐 **Dev Server**: http://localhost:3001

Verify the following pages display correctly with tighter line heights:
- Home page hero (H1)
- Section headlines (H2)
- Subsection headings (H3, H4, H5)

## Rollback Instructions
If needed, the previous values were:
- H1 Desktop line-height: 120px → 96px (now 96px)
- H2 Desktop line-height: 88px → 64px (now 64px)
- H3 Desktop line-height: 64px → 48px (now 48px)

Tablet/Mobile values have been updated to maintain consistent ratios.
