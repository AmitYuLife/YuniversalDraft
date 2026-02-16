# Yugi Animation Documentation

## Overview

The Yugi rocket ship animation follows the **exact design specifications from Figma**, including precise motion paths, positioning, and timing. The animation extracts the SVG path data directly from the Figma design to ensure pixel-perfect accuracy.

## Design Specifications

### From Figma Design
- **Rocket size**: 456×458px
- **Hero section height**: 984px
- **Trust section height**: 576px (starts at 984px from top)
- **Animation path**: Custom cubic Bézier curve defined in Figma

### Animation Path
The rocket follows a precise curved path:
1. **Start point**: Left side (-109px), in Trust section (1312px from top)
2. **Middle point**: Center-right (1139px), in Hero section (869px from top)  
3. **End point**: Far right (2293px), upper Hero section (528px from top)

## Implementation

The animation is implemented in `src/components/animations/YugiAnimation.tsx` using:
- **GSAP MotionPathPlugin** for smooth curved motion following the exact Figma path
- **ScrollTrigger** for scroll-based fly-out animation
- **SVG path** generated from Figma's vector data

## Usage

```tsx
import { YugiAnimation } from "@/components/animations";

<YugiAnimation
  imageSrc="/images/yugi.png"
  alt="Yugi flying in his rocket ship"
  size={456}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `imageSrc` | `string` | **required** | Path to the rocket ship image |
| `alt` | `string` | `"Yugi in his rocket ship"` | Alt text for accessibility |
| `size` | `number` | `456` | Size in pixels (matches Figma design) |

## Animation Sequence

### 1. Fly-in (Page Load)
- **Duration**: 2.5 seconds
- **Starting position**: Off-screen left, in Trust section area
- **Motion**: Follows curved Bézier path upward to center of Hero section
- **Easing**: `power2.inOut` for smooth acceleration/deceleration
- **Visual effects**: Fades in from 0.7 to 1.0 scale, 0 to 100% opacity

### 2. Idle Animation
- **Duration**: 2 seconds per cycle (infinite loop)
- **Motion**: Gentle vertical float (±20px)
- **Rotation**: Subtle tilt (-2° to +2°)
- **Easing**: `sine.inOut` for natural bobbing
- **Start**: 0.5 seconds after fly-in completes

### 3. Fly-out (On Scroll)
- **Trigger**: When user scrolls 100px down
- **Duration**: 1.8 seconds
- **Motion**: Continues along the same curved path to exit right
- **Visual effects**: Scales down to 0.9, fades to 0% opacity
- **Easing**: `power2.in` for smooth exit
- **Behavior**: Triggers once only

## Technical Details

### Responsive Scaling

The animation automatically scales to different viewport widths:

```typescript
const scale = window.innerWidth / 1920;
```

All coordinates are multiplied by this scale factor to maintain proportions on different screen sizes.

### Path Generation

The component generates an SVG path element from Figma's vector data:

```typescript
// Original Figma path (2402px wide, 784px tall):
// M 0 784 C 322.44 747.83 1002.02 634.14 1247.99 341 C 2102.53 392.5 2402 0 2402 0

// Scaled and positioned for viewport
const path = `
  M ${startX} ${startY}
  C ${controlPoint1} ${controlPoint2}
    ${midX} ${midY}
  C ${controlPoint3} ${controlPoint4}
    ${endX} ${endY}
`;
```

### Performance

- Uses GSAP's efficient rendering pipeline
- SVG path hidden but used for motion calculations only
- `pointer-events: none` prevents interaction interference
- Automatic cleanup on unmount prevents memory leaks

## Design Updates

To update the animation path when the design changes:

1. **In Figma**: Modify the "AnimationPath" vector layer
2. **Export path data**: Use Figma Desktop Bridge to extract new coordinates
3. **Update component**: Modify the path vertices in `YugiAnimation.tsx`

### Extracting Path Data from Figma

Use the Figma Console MCP to extract updated specifications:

```typescript
// Query Figma for animation path
const animPath = await figma.getNodeByIdAsync("459:2716");
const pathData = animPath.vectorPaths[0].data;
const vertices = animPath.vectorNetwork.vertices;
```

## Customization

### Adjusting Size

To make the rocket larger or smaller:

```tsx
<YugiAnimation
  imageSrc="/images/yugi.png"
  size={600}  // Larger than default 456px
/>
```

**Note**: Changing size does not affect the motion path, only the rocket's visual size.

### Adjusting Timing

To modify animation durations, edit the component directly:

```typescript
// In YugiAnimation.tsx

// Fly-in duration
duration: 2.5,  // Change this value

// Idle animation cycle
duration: 2,    // Change this value

// Fly-out duration
duration: 1.8,  // Change this value
```

### Adjusting Scroll Trigger

To change when the rocket flies away:

```typescript
// In YugiAnimation.tsx
ScrollTrigger.create({
  start: "top -=100",  // Change 100 to your desired scroll distance
  ...
});
```

## Browser Support

- **Chrome/Edge**: ✅ Full support
- **Firefox**: ✅ Full support
- **Safari**: ✅ Full support (iOS 12+)
- **IE11**: ❌ Not supported (GSAP 3 requires modern browsers)

## Dependencies

- `gsap` (v3.14.2+)
- `gsap/MotionPathPlugin`
- `gsap/ScrollTrigger`

## Troubleshooting

### Rocket doesn't appear
- Check image path: `/images/yugi.png` must exist
- Check browser console for errors
- Verify GSAP is installed: `npm install gsap`

### Animation path is incorrect
- Verify viewport width scaling calculation
- Check that section heights match your actual layout
- Use browser DevTools to inspect element positioning

### Animation is jerky
- Ensure hardware acceleration is enabled in browser
- Check for conflicting CSS animations
- Verify browser supports GSAP 3

### Scroll trigger not working
- Check page is actually scrollable (content taller than viewport)
- Verify scroll distance (default 100px) is appropriate
- Check browser console for ScrollTrigger errors

## Future Enhancements

Possible improvements:
- Add pause/resume controls
- Make scroll trigger distance configurable via props
- Add alternative animation paths for mobile
- Support for RTL layouts
- Prefers-reduced-motion accessibility support
