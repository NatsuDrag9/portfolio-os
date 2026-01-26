# Design & Architecture

This document provides a comprehensive overview of Portfolio OS's design and architecture. Use the table of contents below to navigate detailed sections.

## Table of Contents

1. **[Technology Stack](#technology-stack)** - Languages, frameworks, and libraries
2. **[High-Level Architecture](#high-level-architecture)** - System overview
3. **[UI Flow](./UI_FLOW.md)** - User interface navigation and screen transitions
4. **[Data Flow](./DATA_FLOW.md)** - How data moves through the application
5. **[Component Relationships](./COMPONENT_RELATIONSHIPS.md)** - Component hierarchy and interactions
6. **[Implementation Details](./IMPLEMENTATION_DETAILS.md)** - Code patterns and technical implementation
7. **[Feature Walkthroughs](./FEATURE_WALKTHROUGHS.md)** - Step-by-step flows for key features
8. **[Design Decisions](#design-decisions)** - Why certain choices were made
9. **[Performance & Optimization](#performance--optimization)** - Performance considerations

---

## Technology Stack

| Layer                | Technology      | Version | Purpose                       |
| -------------------- | --------------- | ------- | ----------------------------- |
| **UI Framework**     | React           | 19.2.0  | Component-based UI            |
| **Language**         | TypeScript      | 5.9.3   | Type-safe development         |
| **State Management** | Zustand         | -       | Lightweight state store       |
| **Build Tool**       | Vite            | 6.0.0   | Fast bundling and dev server  |
| **Styling**          | SCSS            | -       | Component styles with nesting |
| **Icons**            | Fluent UI Icons | -       | Windows-style icon set        |
| **Component Dev**    | Storybook       | 8.6.14  | Component documentation       |

---

## High-Level Architecture

Portfolio OS is a **Windows 11-inspired desktop environment** with a **modular application system**.

### Core Layers

```
┌─────────────────────────────────────────────┐
│         React Application (App.tsx)         │
├─────────────────────────────────────────────┤
│  Desktop Environment                        │
│  ├── Window Manager (drag, resize, z-index)│
│  ├── Taskbar (open apps, system info)      │
│  ├── Start Menu (app launcher)              │
│  └── System Tray (clock, settings)          │
├─────────────────────────────────────────────┤
│  Application Layer                          │
│  ├── Portfolio App (main feature)           │
│  ├── File Explorer (file system UI)         │
│  ├── GitHub App (git integration)           │
│  └── Settings App (system config)           │
├─────────────────────────────────────────────┤
│  State Management (Zustand Store)           │
│  ├── Window State                           │
│  ├── Settings State                         │
│  └── App State                              │
├─────────────────────────────────────────────┤
│  UI Components (Reusable)                   │
│  ├── Window Frame                           │
│  ├── Buttons, Navigation                    │
│  └── Forms, Modals                          │
├─────────────────────────────────────────────┤
│  Styling (SCSS)                             │
│  ├── Global styles                          │
│  ├── Component styles (BEM)                 │
│  └── Responsive design                      │
└─────────────────────────────────────────────┘
```

### Application Structure

```
src/
├── App.tsx                 # Root component
├── apps/default/           # Main applications
│   ├── Portfolio/          # Primary portfolio app
│   ├── FileExplorer/       # File browser
│   └── Github/             # Git integration
├── components/             # Reusable UI components
├── store/                  # Zustand state management
├── constants/              # App configuration
├── definitions/            # TypeScript types
└── styles/                 # Global styles
```

---

## Key Architectural Patterns

### 1. Component-Based UI

- **Container Components** (`src/apps/default/`) - Logic and state management
- **Presentational Components** (`src/components/`) - Reusable UI elements
- Each component has `.tsx`, `.scss`, and `.stories.tsx` files

### 2. Zustand State Management

- **Single store** with separate slices by domain
- **Minimal boilerplate** - subscriptions and actions
- **Direct state mutations** - simpler than Redux
- No middleware or complex action creators

**Store Structure:**

```typescript
// Example: Window management
const useWindowStore = create((set) => ({
  windows: [],
  activeWindowId: null,
  openWindow: (appId, config) => set(/* ... */),
  closeWindow: (windowId) => set(/* ... */),
  setActiveWindow: (windowId) => set(/* ... */),
}));
```

### 3. Responsive Design

- **Breakpoints:** Mobile (450px), Tablet (768px), Desktop (1920px)
- **BEM Naming:** `.block__element--modifier`
- **SCSS Mixins:** `@include media-mobile { }`
- **Flexible Layouts:** Flexbox and Grid

### 4. Type Safety

- **Strict TypeScript** enabled for compile-time error checking
- **Centralized types** in `src/definitions/`
- **Props interfaces** for every component
- **Avoid `any` types** - use specific types

---

## Design Decisions

### Why Zustand?

- Less boilerplate than Redux
- Easier learning curve
- Perfect for medium-sized apps
- Better TypeScript inference
- Minimal overhead

### Why React Hooks?

- Modern React patterns
- Simpler state management in components
- Easier to test and refactor
- Code reuse through custom hooks

### Why Vite?

- Fast development server (instant HMR)
- Optimized production builds
- Native ES modules support
- Great plugin ecosystem
- Smaller bundle size than Webpack
- Have professional experience

### Why SCSS?

- Nesting reduces repetition
- Variables and mixins for consistency
- Better maintainability
- BEM methodology for organization
- Have professional experience

### Why Component-Based?

- Reusability and composition
- Easier testing and maintenance
- Scalable architecture
- Clear separation of concerns
- Documented with Storybook

---

## Performance & Optimization

### Current Optimizations

- **Code splitting** at route level (if routing is added)
- **Tree-shaking** enabled in production build
- **Lazy loading** for heavy components
- **Image optimization** - compressed assets
- **SCSS nesting** - generated CSS only for used styles

### Monitoring

```bash
# Analyze bundle size
VITE_BUNDLE_ANALYZE=true yarn build

# Check build output
ls -lh dist/

# Preview production build
yarn preview
```

### Best Practices

- Use `React.memo()` for expensive components
- Use `useMemo()` for expensive computations
- Use `useCallback()` for stable function references
- Keep components focused and small
- Lazy load heavy libraries (recharts, etc.)

---

## Detailed Documentation

For in-depth information on specific aspects, see:

### User Interactions

- **[UI Flow](./UI_FLOW.md)** - How screens navigate and transition
- **[Feature Walkthroughs](./FEATURE_WALKTHROUGHS.md)** - Step-by-step flows with code

### Technical Implementation

- **[Data Flow](./DATA_FLOW.md)** - How data moves through the application
- **[Component Relationships](./COMPONENT_RELATIONSHIPS.md)** - Component hierarchy
- **[Implementation Details](./IMPLEMENTATION_DETAILS.md)** - Code patterns and examples

### Project Setup

- **[Customization Guide](./CUSTOMIZATION_GUIDE.md)** - Personalize your portfolio
- **[Helper Scripts](./HELPER_SCRIPTS.md)** - Available npm/yarn commands

---

<!-- ## Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Fully supported |
| Firefox | Latest | ✅ Fully supported |
| Safari | Latest | ✅ Fully supported |
| Edge | Latest | ✅ Fully supported |
| Mobile (iOS Safari) | Latest | ✅ Responsive design |
| Mobile (Chrome) | Latest | ✅ Responsive design | -->
