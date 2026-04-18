# Slider

**Location:** [src/components/Slider/](../../src/components/Slider/)

## Overview

`Slider` is a controlled range input for system-level settings: **brightness** and **volume**. It's intentionally small — the entire implementation is ~120 lines — but every piece of it is load-bearing:

- Renders a native `<input type="range">` (free a11y, free keyboard support)
- Context-aware icon on the label: mute / speaker, dim / bright
- Tooltip showing the current numeric value, position-tracked with the thumb
- Supports horizontal (default) and vertical orientation

Consumed by:
- `QuickActionsPopup` (taskbar) — two instances, brightness + volume
- `Settings` app panels (system settings surface)

## API

Defined in [Slider.tsx:11-16](../../src/components/Slider/Slider.tsx#L11-L16).

```ts
interface SliderProps {
  sliderFor: 'volume' | 'brightness';                  // Icon + callback tagging
  sliderValue: number;                                 // 0–100, fully controlled
  onSliderChange: (value: number, sliderFor: SliderForType) => void;
  alignment?: 'horizontal' | 'vertical';               // Defaults to 'horizontal'
}
```

The component is **fully controlled** — it never stores `sliderValue` internally. Parent holds it, passes it in, receives updates via `onSliderChange`. Clamping, debouncing, or persistence are the parent's job.

## State

| State / ref  | Type                    | Purpose                                                                 |
| ------------ | ----------------------- | ----------------------------------------------------------------------- |
| `showTooltip`| `boolean`               | Mounts the value tooltip                                                |
| `sliderRef`  | `HTMLInputElement` ref  | Used on `mouseup` to check `:hover` state before hiding the tooltip     |

## Tooltip lifecycle

There are four mouse events, and the tooltip responds to all of them:

| Event         | Action                                                                          |
| ------------- | ------------------------------------------------------------------------------- |
| `mouseenter`  | Show tooltip                                                                    |
| `mousedown`   | Show tooltip (in case the enter event didn't fire — e.g. click without movement)|
| `mouseleave`  | Hide tooltip                                                                    |
| `mouseup`     | Hide **only if** the pointer is no longer over the input (`matches(':hover')`)  |

The `mouseup` check exists because when a user drags the thumb, the mouse can leave and re-enter the input element during the drag. Without that check, releasing while still hovering could hide the tooltip, even though the user is still actively interacting.

This is a good example of "browser events don't map 1:1 to user intent" — you need a second signal (`:hover`) to disambiguate.

## Tooltip position

```ts
alignment === 'vertical'
  ? { bottom: `${sliderValue}%` }
  : { left: `${sliderValue}%` }
```

Position is `sliderValue`%, not mouse position. The tooltip therefore tracks the **value**, not the pointer — even mid-drag the tooltip is anchored to where the thumb actually is.

### Caveat: thumb-width drift

Because position is a raw percentage, the tooltip doesn't perfectly align with the thumb at the extremes — the thumb has physical width and centers differently at 0% vs 100%. For a pixel-accurate tooltip, you'd need `left: calc(${v}% - (thumb-width * (${v}/100 - 0.5)))` or a ResizeObserver. The current approach is "good enough" and dependency-free.

## Icon logic — [Slider.tsx:27-41](../../src/components/Slider/Slider.tsx#L27-L41)

Two axes of conditional rendering:

| `sliderFor`  | `sliderValue === 0`   | `sliderValue > 0`       |
| ------------ | --------------------- | ----------------------- |
| `'volume'`   | `SpeakerMuteRegular`  | `Speaker0Regular`       |
| `'brightness'` | `BrightnessLowRegular` | `BrightnessHighRegular` |

Note: the "on" state is represented by the same icon for every `sliderValue > 0`. There's no intermediate state (e.g. "speaker with one wave" vs. "speaker with three waves"); that would require either more icons or a tier function based on the value.

## Accessibility

A lot of a11y is free because the underlying element is a native range input:

- ✅ Keyboard: arrow keys change value, Home/End jump to extremes, Page Up/Down for larger jumps
- ✅ Screen readers: announce as "slider, 47" automatically
- ✅ `label[for]` association is correct — `htmlFor={sliderFor}` matches `id={sliderFor}`
- ✅ Focus indication handled by browser / CSS

Gaps:
- ❌ No `aria-label` / `aria-labelledby` — the label is an icon with no text
- ❌ No `aria-valuetext` — screen readers announce `47` but not `"volume at 47 percent"`
- ❌ Tooltip is purely visual — no `aria-live` region mirroring the value

## Dependencies

- **Fluent UI icons:** `BrightnessHighRegular`, `BrightnessLowRegular`, `Speaker0Regular`, `SpeakerMuteRegular`
- **React:** `useState`, `useRef`, `ChangeEvent`
- **Types:** `SliderForType` from `@definitions/desktopTypes`

No Zustand, no external sliders/UI libs — fully self-contained.

## Gotchas

1. **Touch events aren't handled.** Mouse enter/leave/down/up are mouse-specific. On mobile, native touch events don't fire `mouseenter`, so the tooltip may never appear. iOS synthesizes mouse events after touch, which makes the tooltip flicker on tap. A proper fix uses Pointer Events (`onPointerEnter`, `onPointerDown`, etc.).
2. **`sliderValue` is assumed 0–100.** Passing a value outside that range still renders, but tooltip position goes off-track.
3. **No internal clamping.** If the parent passes `150`, the input displays capped at `100` but the tooltip shows `150`. Clamp at the call site.
4. **Icon threshold is `=== 0`.** There's no "very low volume" icon state — 1 and 100 render the same icon.
5. **Race between `mouseleave` and `mouseup`.** If the user releases exactly as they cross the edge, both fire — `mouseleave` first hides, then `mouseup`'s `matches(':hover')` is false, so it tries to hide again. Harmless, but worth knowing when reading the code.

## Performance

Nothing meaningful to optimize. Helper functions (`getIcon`, `getTooltipPosition`) are re-created every render but they're closures over primitives — lifting them out would save nanoseconds. The component never remounts its input; React reconciles `value` in place.

If you had **hundreds** of sliders on one screen (you won't), you'd `React.memo` on props.

## Interview talking points

- **Why fully controlled?** Walk through the trade-offs: uncontrolled would be simpler for one-off use, but controlled is the only way to drive the value from external sources (store, sync from another surface). Extending to "debounce writes to the store" is trivial at the parent, impossible if state is internal.
- **`:hover` read via ref at mouseup.** A small but real case where reading DOM state at event time is cleaner than tracking it in React state. Contrast with adding a `isHovering` boolean and synchronizing it across three event handlers.
- **Tooltip anchored to value, not pointer.** This is the kind of detail interviewers probe — "what happens during a drag if the mouse lags?" The value-based anchor is the correct answer (tooltip stays pinned to thumb), and you can articulate *why*.
- **Percentage-based positioning vs. pixel math.** When is "good enough" good enough? Thumb-width drift at extremes is imperceptible here; explain when you'd switch strategies (e.g. a 500px-wide scrubber with a 20px thumb → 4% drift → noticeable).
- **Free accessibility from native elements.** A common React antipattern is re-implementing `<input type="range">` with `<div role="slider">`. Native gives you keyboard, focus, ARIA roles, platform styling cues. Name three things you'd have to rebuild by hand if you abandoned the native input.
- **Pointer Events as a unification story.** When the interviewer asks about mobile, the correct answer isn't "add `onTouchStart`" — it's "use `onPointerEnter` and friends, which cover mouse, touch, and pen with one API."
