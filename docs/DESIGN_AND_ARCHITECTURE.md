# Design & Architecture

This document provides a comprehensive overview of Portfolio OS's design and architecture. Use the table of contents below to navigate detailed sections.

## Table of Contents

1. **[Technology Stack](#technology-stack)** - Languages, frameworks, and libraries
2. **[High-Level Architecture](#high-level-architecture)** - System overview
3. **[Store Documentation](./STORE_DOCUMENTATION.md)** - Zustand stores and state management
4. **[Screens Documentation](./SCREENS_DOCUMENTATION.md)** - Boot state machine and screen architecture
5. **[UI Flow](./UI_FLOW.md)** - User interface navigation and screen transitions
6. **[Data Flow](./DATA_FLOW.md)** - How data moves through the application
7. **[Component Relationships](./COMPONENT_RELATIONSHIPS.md)** - Component hierarchy and interactions
8. **[Implementation Details](./IMPLEMENTATION_DETAILS.md)** - Code patterns and technical implementation
9. **[Feature Walkthroughs](./FEATURE_WALKTHROUGHS.md)** - Step-by-step flows for key features
10. **[Design Decisions](#design-decisions)** - Why certain choices were made
11. **[Performance & Optimization](#performance--optimization)** - Performance considerations

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

- **Multiple stores** for different domains (Auth, SystemUI, WorkspaceState, BootStatus, Settings)
- **Minimal boilerplate** - subscriptions and actions
- **Direct state mutations** - simpler than Redux
- No middleware or complex action creators

**Store Overview:**

The app uses 4 specialized stores from `src/store/store.ts`:

| Store                 | Responsibility                               |
| --------------------- | -------------------------------------------- |
| **useWorkspaceState** | Window management, desktop layout, taskbar   |
| **useSystemUIState**  | Theme, brightness, UI preferences, date/time |
| **useAuth**           | User authentication, permissions             |
| **useBootStatus**     | Boot sequence, startup operations            |

**Example Usage:**

```typescript
// Window management
const { addWindow, activeWindows } = useWorkspaceState();
addWindow('portfolio-default', appMetadata);

// Theme switching
const { currentTheme, setTheme } = useSystemUIState();
setTheme('dark');

// Permission checking
const { isAdmin } = useAuth();

// Boot status
const { bootStatus } = useBootStatus();
```

**For detailed store documentation** including all state properties, actions, and usage examples, see **[Store Documentation](./STORE_DOCUMENTATION.md)**.

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

## Detailed Documentation

For in-depth information on specific aspects, see:

### State Management

- **[Store Documentation](./STORE_DOCUMENTATION.md)** - Complete reference for all Zustand stores (useWorkspaceState, useSystemUIState, useAuth, useBootStatus), including state properties, actions, and usage examples

### Screen Architecture & Navigation

- **[Screens Documentation](./SCREENS_DOCUMENTATION.md)** - Technical boot state machine, screen architecture, state management per screen, and navigation conditions between different states
- **[UI Flow](./UI_FLOW.md)** - User journeys, visual flows, and user interactions from the user perspective when navigating through screens and features

### Implementation Details

- **[Data Flow](./DATA_FLOW.md)** - How data moves through the application
- **[Component Relationships](./COMPONENT_RELATIONSHIPS.md)** - Component hierarchy and interactions
- **[Feature Walkthroughs](./FEATURE_WALKTHROUGHS.md)** - Step-by-step code walkthroughs of key features with real implementations
- **[Implementation Details](./IMPLEMENTATION_DETAILS.md)** - Code patterns and examples

### Customization & Setup

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
