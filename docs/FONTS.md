# Custom Web Fonts Integration

This guide walks you through adding custom web fonts to the project.

## Step 1: Add Font Files

1. Place your font files in `/public/fonts/`
2. Organize by font family (e.g., `/public/fonts/YourBrand/`)
3. Use WOFF2 format (best compression) with WOFF fallback

**Example structure:**
```
public/fonts/
├── YourBrand/
│   ├── YourBrand-Regular.woff2
│   ├── YourBrand-Regular.woff
│   ├── YourBrand-Medium.woff2
│   ├── YourBrand-Medium.woff
│   ├── YourBrand-SemiBold.woff2
│   ├── YourBrand-SemiBold.woff
│   ├── YourBrand-Bold.woff2
│   └── YourBrand-Bold.woff
```

## Step 2: Define @font-face Rules

Edit `src/styles/fonts/font-face.css`:

```css
@font-face {
  font-family: 'YourBrand';
  src: url('/fonts/YourBrand/YourBrand-Regular.woff2') format('woff2'),
       url('/fonts/YourBrand/YourBrand-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap; /* Prevents FOIT (Flash of Invisible Text) */
}

@font-face {
  font-family: 'YourBrand';
  src: url('/fonts/YourBrand/YourBrand-Medium.woff2') format('woff2'),
       url('/fonts/YourBrand/YourBrand-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'YourBrand';
  src: url('/fonts/YourBrand/YourBrand-SemiBold.woff2') format('woff2'),
       url('/fonts/YourBrand/YourBrand-SemiBold.woff') format('woff');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'YourBrand';
  src: url('/fonts/YourBrand/YourBrand-Bold.woff2') format('woff2'),
       url('/fonts/YourBrand/YourBrand-Bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

## Step 3: Import Font Faces in globals.css

Add to the top of `src/app/globals.css`:

```css
@import "../styles/fonts/font-face.css";
@import "tailwindcss";

/* rest of your styles... */
```

## Step 4: Update Design System Tokens

Edit `src/design-system/tokens/typography.ts`:

```typescript
export const fontFamily = {
  sans: "'YourBrand', ui-sans-serif, system-ui, sans-serif",
  mono: "ui-monospace, monospace",
} as const;
```

## Step 5: Update CSS Custom Properties

Edit `src/app/globals.css` and update the `@theme inline` block:

```css
@theme inline {
  --font-sans: 'YourBrand', ui-sans-serif, system-ui, sans-serif;
  --font-mono: ui-monospace, monospace;
  /* ... other theme values ... */
}
```

## Step 6: Remove Next.js Google Fonts (Optional)

If you're replacing the default fonts entirely, update `src/app/layout.tsx`:

**Before:**
```tsx
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// In the component...
<body className={`${geistSans.variable} ...`}>
```

**After:**
```tsx
// Remove font imports

// In the component...
<body className="font-sans antialiased">
```

## Font Display Strategy

The `font-display: swap` property in @font-face ensures:
- Text is immediately visible with a fallback font
- Custom font replaces the fallback once loaded
- No "flash of invisible text" (FOIT)

Alternative strategies:
- `font-display: optional` - only use custom font if it loads quickly
- `font-display: block` - wait for font (may cause FOIT)

## Performance Tips

1. **Preload critical fonts** in `layout.tsx`:
   ```tsx
   export default function RootLayout({ children }) {
     return (
       <html lang="en">
         <head>
           <link
             rel="preload"
             href="/fonts/YourBrand/YourBrand-Regular.woff2"
             as="font"
             type="font/woff2"
             crossOrigin="anonymous"
           />
         </head>
         <body>{children}</body>
       </html>
     );
   }
   ```

2. **Subset fonts** - Only include the characters you need
3. **Use WOFF2** - ~30% better compression than WOFF
4. **Limit weights** - Only include the weights you actually use

## Verifying Fonts

1. Run `npm run dev`
2. Open DevTools → Network tab
3. Filter by "Font"
4. Verify your fonts are loading with 200 status
5. Check the Elements tab to see computed font-family values

## Troubleshooting

**Fonts not loading?**
- Check file paths in @font-face (must start with `/fonts/`)
- Verify font files are in `/public/fonts/`
- Check browser console for 404 errors
- Ensure `crossOrigin="anonymous"` if using preload

**FOUT (Flash of Unstyled Text)?**
- Add `font-display: swap` to all @font-face rules
- Consider using `font-display: optional` for non-critical fonts

**Wrong font weight?**
- Verify `font-weight` values in @font-face match the actual font files
- Check if font file names match the weights (Regular=400, Medium=500, etc.)
