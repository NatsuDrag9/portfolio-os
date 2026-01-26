# Architecture & Design

## Technology Stack

- **UI Framework:** React 19.2.0
- **Language:** TypeScript 5.9.3
- **State Management:** Zustand
- **Build Tool:** Vite 6.0.0
- **Styling:** SCSS with BEM methodology
- **Icon Library:** Fluent UI Icons

---

## State Management (Zustand)

### Store Architecture

The application uses **Zustand** for centralized state management with separate slices for different domains.

**Key Principles:**

- Single source of truth
- Normalized state structure
- Slice-based organization
- Minimal boilerplate

### Store Slices

Expected store structure:

```typescript
// Window Management Store
store.windowStore
  - openWindows: WindowInstance[]
  - activeWindowId: string
  - openWindow(appId, config)
  - closeWindow(windowId)
  - setActiveWindow(windowId)
  - updateWindowPosition(windowId, x, y)
  - updateWindowSize(windowId, width, height)

// Settings Store
store.settingsStore
  - theme: 'light' | 'dark'
  - notifications: boolean
  - volume: number
  - updateTheme(theme)
  - updateSettings(config)

// App Store (if applicable)
store.appStore
  - state related to specific application needs
```

### Usage Example

```typescript
import { useWindowStore } from '@store/windowStore';

function Component() {
  const openWindows = useWindowStore((state) => state.openWindows);
  const openWindow = useWindowStore((state) => state.openWindow);

  return (
    // Component JSX
  );
}
```

---

## Component Architecture

### Component Organization

Components are organized into two categories:

#### 1. **Page/Container Components**

Located in `src/apps/default/`

- Manage complex logic and routing
- Connect to store
- Handle data fetching and state
- Example: `Portfolio.tsx`, `AboutMe.tsx`

#### 2. **Reusable Components**

Located in `src/components/`

- Presentational components
- Accept props for customization
- Storybook stories included
- Example: `PortfolioNavbar`, `Window`, `TaskBar`

### Component File Structure

Each component should follow this structure:

```
ComponentName/
├── ComponentName.tsx              # Main component
├── ComponentName.scss             # Component styles (scoped)
├── ComponentName.stories.tsx      # Storybook stories
├── playFunctions.ts               # Play functions for interactive testing (optional)*
├── types.ts                       # Component-specific types (optional)
├── constants.ts                   # Component constants (optional)
└── utils.ts                       # Component utilities (optional)

* Only required if component has actionable events to be tested
```

### Component Patterns

**Functional Components with Hooks:**

```typescript
function MyComponent({ prop1, prop2 }: MyComponentProps) {
  const [state, setState] = useState(initialState);
  const value = useSelector(state => state.value);

  useEffect(() => {
    // Side effects
  }, [dependency]);

  return (
    // JSX
  );
}

export default MyComponent;
```

**Props Interface:**

```typescript
interface MyComponentProps {
  /** Description of prop */
  prop1: string;
  /** Optional prop with default */
  prop2?: boolean;
  /** Callback function */
  onAction: (value: string) => void;
}
```

---

## Styling Architecture

### SCSS Organization

**Global Styles:**

- `src/styles/_helpers.scss` - Variables, mixins, functions
- `src/styles/_global.scss` - Global resets and typography
- `src/styles/_variables.scss` - Color palette, spacing, breakpoints

### BEM Naming Convention

Block-Element-Modifier pattern:

```scss
// Block
.portfolio-navbar {
  // Element
  &__button {
    // Modifier
    &--active {
      // Styles
    }
  }
}
```

**Usage:**

```html
<nav class="portfolio-navbar">
  <button class="portfolio-navbar__button portfolio-navbar__button--active">
    Active Button
  </button>
</nav>
```

### Responsive Design

Breakpoints are defined in `_helpers.scss`. Use SCSS mixins:

```scss
@mixin media-mobile {
  @media (max-width: 450px) {
    @content;
  }
}

.portfolio-navbar {
  display: flex;

  @include media-mobile {
    flex-direction: column;
  }
}
```

---

## TypeScript Configuration

### Key Settings

- **Strict Mode:** Enabled for type safety
- **Target:** ES2020+
- **Module:** ESNext for tree-shaking
- **JSX:** React 19

### Type Definitions

Store all shared types in `src/definitions/`:

```typescript
// definitions/index.ts
export interface WindowInstance {
  id: string;
  appId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
}

export interface AppConfig {
  id: string;
  name: string;
  icon: string;
  // ...
}
```

---

## Data Flow

### Portfolio Section Rendering

```
App.tsx
  └── DefaultApp (Windows Container)
      └── Portfolio.tsx (Main State & Router)
          ├── PortfolioNavbar (Navigation)
          │   └── onClick -> handleSectionChange()
          │       └── Resume button triggers download
          │       └── setActiveSection(id)
          └── renderSection() (Conditional Renderer)
              ├── AboutMe
              ├── Projects
              ├── Skills
              ├── WorkExperience
              └── DownloadableResume
```

### Resume Download Flow

1. User clicks Resume button in `PortfolioNavbar`
2. `onButtonClick` callback triggers `handleSectionChange('portfolio-resume')`
3. In `Portfolio.tsx` `handleSectionChange()`:
   - Detects `id === 'portfolio-resume'`
   - Creates temporary `<a>` element
   - Sets `href` to `/portfolio-os/Rohit_Resume_Frontend_2.pdf`
   - Triggers programmatic download via `.click()`
   - Cleans up DOM
4. Section updates to show `DownloadableResume` component

---

## Key Design Decisions

### 1. Zustand over Redux

- Less boilerplate
- Easier to learn and maintain
- Sufficient for app's state complexity
- Better TypeScript inference

### 2. Component-Based Architecture

- Easy to test and maintain
- Reusable components via Storybook
- Clear separation of concerns
- Scalable structure

### 3. BEM for Styling

- Predictable class naming
- No CSS specificity issues
- Easy to maintain and modify
- Scoped to components

### 4. TypeScript Strict Mode

- Catch errors at compile time
- Better IDE support and autocomplete
- Self-documenting code through types
- Easier refactoring

### 5. Vite for Build Tool

- Fast development server
- Optimized production builds
- Native ES modules support
- Great plugin ecosystem

---

## Performance Considerations

### Code Splitting

- Route-based code splitting (if routing is added)
- Component lazy loading for heavy components

### Memoization

- Use `React.memo()` for expensive components
- Use `useMemo()` for expensive computations
- Use `useCallback()` for stable function references

### Storybook

- Helps identify unnecessary re-renders
- Isolates component testing
- Documents component variations

### Bundle Size

- Monitor with `vite-bundle-analyzer`
- Tree-shake unused exports
- Lazy load heavy libraries (e.g., recharts)

---

<!-- ## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers with similar capabilities

--- -->
<!--
## Testing Strategy

### Component Testing
- Storybook stories for visual regression
- Manual testing in different browsers
- Responsive design testing

### Integration Testing
- Window operations (open, close, resize, drag)
- Navigation between portfolio sections
- Resume download functionality

### Manual Testing
- Cross-browser compatibility
- Mobile responsiveness
- Accessibility (keyboard navigation, screen readers)

---

## Future Enhancements

- Unit/integration testing framework
- E2E testing (Cypress/Playwright)
- Dark mode toggle
- Internationalization (i18n)
- Performance monitoring
- Analytics integration

---

## Related Documentation

- [Helper Scripts](./HELPER_SCRIPTS.md)
- [Troubleshooting Guide](./TROUBLESHOOTING.md)
- [Contributing Guidelines](../.github/CONTRIBUTING.md) -->
