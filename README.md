# spotlight-card

[![npm version](https://img.shields.io/npm/v/spotlight-card)](https://www.npmjs.com/package/spotlight-card)
[![npm downloads](https://img.shields.io/npm/dm/spotlight-card)](https://www.npmjs.com/package/spotlight-card)
[![CI](https://github.com/ofershap/spotlight-card/actions/workflows/ci.yml/badge.svg)](https://github.com/ofershap/spotlight-card/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue.svg)](https://www.typescriptlang.org/)
[![license](https://img.shields.io/npm/l/spotlight-card)](https://github.com/ofershap/spotlight-card/blob/main/LICENSE)

A React component that adds a mouse-tracking radial glow to any card. One import, zero dependencies, works with Tailwind or inline styles.

```tsx
<SpotlightCard className="p-8 rounded-xl bg-zinc-900 border border-zinc-800">
  <h3>Hover me</h3>
  <p>The spotlight follows your cursor.</p>
</SpotlightCard>
```

![Demo](assets/demo.gif)

## Install

```bash
npm install spotlight-card
```

## Usage

### Component

```tsx
import { SpotlightCard } from "spotlight-card";

function App() {
  return (
    <SpotlightCard
      style={{
        padding: "2rem",
        borderRadius: "12px",
        background: "#1e1e2e",
        border: "1px solid #313244",
      }}
    >
      <h3>Hover me</h3>
      <p>The spotlight follows your cursor.</p>
    </SpotlightCard>
  );
}
```

### With Tailwind CSS

```tsx
<SpotlightCard className="p-8 rounded-xl bg-zinc-900 border border-zinc-800">
  <h3 className="text-lg font-bold">Feature</h3>
  <p className="text-zinc-400">Description of the feature.</p>
</SpotlightCard>
```

### Custom Colors

```tsx
<SpotlightCard color="59, 130, 246" opacity={0.2} size={400}>
  Blue spotlight with larger radius
</SpotlightCard>
```

### Hook Only

Use `useSpotlight` for full control over rendering:

```tsx
import { useSpotlight } from "spotlight-card";

function CustomCard() {
  const { containerRef, spotlightStyle, handlers } = useSpotlight({
    size: 300,
    color: "168, 85, 247",
    opacity: 0.15,
  });

  return (
    <div ref={containerRef} {...handlers} style={{ position: "relative" }}>
      <div style={spotlightStyle} />
      <p>Custom layout with spotlight</p>
    </div>
  );
}
```

## API

### `<SpotlightCard>`

| Prop      | Type          | Default           | Description                   |
| --------- | ------------- | ----------------- | ----------------------------- |
| `size`    | `number`      | `350`             | Spotlight radius in pixels    |
| `color`   | `string`      | `"255, 255, 255"` | RGB color string              |
| `opacity` | `number`      | `0.15`            | Spotlight opacity (0-1)       |
| `enabled` | `boolean`     | `true`            | Enable/disable the effect     |
| `as`      | `ElementType` | `"div"`           | Render as a different element |

Plus all standard HTML div attributes (`className`, `style`, `onClick`, etc.).

### `useSpotlight(options?)`

Returns `{ containerRef, spotlightStyle, handlers, state }`.

- **`containerRef`** — attach to the container element
- **`spotlightStyle`** — CSS for the spotlight overlay
- **`handlers`** — `{ onMouseMove, onMouseEnter, onMouseLeave }`
- **`state`** — `{ x, y, isHovered }`

## License

MIT
