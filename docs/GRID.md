# Grid System

The project uses a 12-column grid system matching the Figma design specification.

## Figma Spec

- **12 columns**
- **Margin:** 40px (horizontal padding on large screens)
- **Gutter:** 32px (gap between columns)

## Container Component

The `Container` component provides responsive horizontal margins that scale from mobile to desktop:

```tsx
import { Container } from "@/design-system";

<Container size="lg">
  {/* Content with responsive margins */}
</Container>
```

**Responsive margins:**
- Mobile (< 640px): 16px (`px-4`)
- Tablet (≥ 640px): 24px (`px-6`)
- Desktop (≥ 768px): 32px (`px-8`)
- Large (≥ 1024px): 40px (`px-10`) — matches Figma

**Size options:**
- `sm`: max-width 672px
- `md`: max-width 896px
- `lg`: max-width 1152px (default)
- `xl`: max-width 1280px

## Grid Component

The `Grid` component creates a 12-column layout with Figma's 32px gutter by default.

### Basic Usage

```tsx
import { Grid, GridItem } from "@/design-system";

<Container>
  <Grid>
    <GridItem span={6}>Half width</GridItem>
    <GridItem span={6}>Half width</GridItem>
  </Grid>
</Container>
```

### Responsive Layouts

```tsx
<Grid>
  {/* Full width on mobile, half on tablet, third on desktop */}
  <GridItem span={12} spanMd={6} spanLg={4}>
    Card 1
  </GridItem>
  <GridItem span={12} spanMd={6} spanLg={4}>
    Card 2
  </GridItem>
  <GridItem span={12} spanMd={6} spanLg={4}>
    Card 3
  </GridItem>
</Grid>
```

### Common Layouts

**Two columns (50/50):**
```tsx
<Grid>
  <GridItem span={6}>Left</GridItem>
  <GridItem span={6}>Right</GridItem>
</Grid>
```

**Three columns (33/33/33):**
```tsx
<Grid>
  <GridItem span={4}>Column 1</GridItem>
  <GridItem span={4}>Column 2</GridItem>
  <GridItem span={4}>Column 3</GridItem>
</Grid>
```

**Sidebar layout (33/66):**
```tsx
<Grid>
  <GridItem span={4}>Sidebar</GridItem>
  <GridItem span={8}>Main content</GridItem>
</Grid>
```

**Asymmetric (25/75):**
```tsx
<Grid>
  <GridItem span={3}>Sidebar</GridItem>
  <GridItem span={9}>Main content</GridItem>
</Grid>
```

### Custom Gap

Override the default 32px gutter:

```tsx
<Grid gap={4}>  {/* 16px gap */}
  <GridItem span={6}>...</GridItem>
  <GridItem span={6}>...</GridItem>
</Grid>
```

**Available gaps:**
- `0` = 0px
- `1` = 4px
- `2` = 8px
- `3` = 12px
- `4` = 16px
- `5` = 20px
- `6` = 24px
- `8` = 32px (default, matches Figma)
- `10` = 40px
- `12` = 48px

### Custom Columns

For simpler layouts, you can override the column count:

```tsx
<Grid cols={3}>  {/* 3 equal columns */}
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</Grid>
```

## Using Tailwind Classes Directly

If you prefer not to use the Grid components, you can use Tailwind classes directly:

```tsx
<Container>
  <div className="grid grid-cols-12 gap-8">
    <div className="col-span-6">Half width</div>
    <div className="col-span-6">Half width</div>
  </div>
</Container>
```

## Responsive Pattern Examples

### Mobile-first cards

```tsx
<Grid>
  {products.map((product) => (
    <GridItem
      key={product.id}
      span={12}      // Full width on mobile
      spanSm={6}     // Half width on small screens
      spanMd={4}     // Third width on medium screens
      spanLg={3}     // Quarter width on large screens
    >
      <Card>{product.name}</Card>
    </GridItem>
  ))}
</Grid>
```

### Hero with offset

```tsx
<Grid>
  <GridItem span={12} spanLg={8} className="lg:col-start-3">
    {/* Centered with 2-column offset on large screens */}
    <Text variant="heading-xl">Welcome to YuLife</Text>
  </GridItem>
</Grid>
```

### Complex layout

```tsx
<Grid>
  {/* Header spans full width */}
  <GridItem span={12}>
    <Text variant="heading-lg">Products</Text>
  </GridItem>

  {/* Sidebar on desktop only */}
  <GridItem span={12} spanLg={3} className="hidden lg:block">
    <FilterSidebar />
  </GridItem>

  {/* Main content area */}
  <GridItem span={12} spanLg={9}>
    <ProductList />
  </GridItem>
</Grid>
```

## Best Practices

1. **Always wrap Grid in Container** for proper margins
2. **Use GridItem for responsive layouts** instead of manual col-span classes
3. **Default to full width on mobile** (`span={12}`) for better readability
4. **Test at all breakpoints** to ensure content flows properly
5. **Use semantic HTML** - Grid is just `<div>` for layout

## Breakpoints Reference

- **sm:** 640px
- **md:** 768px
- **lg:** 1024px
- **xl:** 1280px

These match Tailwind's default breakpoints and work with the Container max-widths.
