# Web Fonts

Drop your web font files in this directory.

## Supported Formats

- **WOFF2** (recommended) - best compression, modern browser support
- **WOFF** - fallback for older browsers
- **TTF/OTF** - optional, for broader compatibility

## File Organization

Organize fonts by family name:

```
fonts/
├── YourFontFamily/
│   ├── YourFontFamily-Regular.woff2
│   ├── YourFontFamily-Regular.woff
│   ├── YourFontFamily-Medium.woff2
│   ├── YourFontFamily-Medium.woff
│   ├── YourFontFamily-SemiBold.woff2
│   ├── YourFontFamily-SemiBold.woff
│   ├── YourFontFamily-Bold.woff2
│   └── YourFontFamily-Bold.woff
```

## After Adding Fonts

1. Update `src/styles/fonts/font-face.css` with @font-face declarations
2. Update `src/design-system/tokens/typography.ts` with your font family names
3. Import the font-face CSS in your layout or globals.css

See [Font Integration Guide](../../docs/FONTS.md) for complete setup instructions.
