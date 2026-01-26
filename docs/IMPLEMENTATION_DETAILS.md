# Implementation Details

Code patterns, examples, and technical implementation details for Portfolio OS.

---

## Project File Structure

```
src/
├── App.tsx                           # Root component
├── main.tsx                          # React entry point
├── apps/
│   ├── default/
│   │   ├── AboutMe/
│   │   │   ├── AboutMe.tsx
│   │   │   ├── AboutMe.scss
│   │   │   └── AboutMe.stories.tsx
│   │   ├── DownloadableResume/
│   │   │   ├── DownloadableResume.tsx
│   │   │   ├── DownloadableResume.scss
│   │   │   └── DownloadableResume.stories.tsx
│   │   ├── Portfolio/
│   │   │   ├── Portfolio.tsx         # Main container
│   │   │   ├── PortfolioSection.tsx  # Conditional renderer
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Sidebar.scss
│   │   │   │   └── constants.ts
│   │   │   ├── constants.ts          # Nav buttons
│   │   │   └── Portfolio.scss
│   │   ├── Projects/
│   │   ├── Skills/
│   │   ├── WorkExperience/
│   │   ├── FileExplorer/
│   │   └── Github/
│   └── recommended/
│       ├── DefaultApp.tsx             # Desktop wrapper
│       ├── Settings/
│       └── [other system apps]
│
├── components/                        # Reusable UI components
│   ├── PortfolioNavbar/
│   │   ├── PortfolioNavbar.tsx
│   │   ├── PortfolioNavbar.scss
│   │   └── PortfolioNavbar.stories.tsx
│   ├── Window/
│   ├── TaskBar/
│   ├── StartMenu/
│   └── [other shared components]
│
├── store/                             # Zustand state management
│   ├── useWindowStore.ts
│   ├── useSettingsStore.ts
│   └── [other store slices]
│
├── constants/
│   ├── portfolioConstants.ts          # PRIMARY: Portfolio content
│   └── appConstants.ts                # Global app config
│
├── definitions/                       # TypeScript types
│   └── index.ts
│
├── styles/
│   ├── _helpers.scss                  # Mixins, variables
│   ├── _variables.scss                # Color palette
│   ├── _global.scss                   # Global styles
│   └── index.scss
│
└── utils/                             # Utility functions
    └── [helper functions]
```

---

## Component Patterns

### Container Component (Portfolio.tsx)

```typescript
import { ReactNode, useState } from 'react';
import './Portfolio.scss';
import PortfolioNavbar from '@components/PortfolioNavbar';
import { PORTFOLIO_NAV_BUTTONS, PortfolioSectionId } from './constants';

function Portfolio() {
  // Local state for section navigation
  const [activeSection, setActiveSection] = useState<PortfolioSectionId>(
    'portfolio-about'
  );

  // Handle section changes, including special cases (like resume download)
  const handleSectionChange = (id: string | number) => {
    // Special logic for resume download
    if (id === 'portfolio-resume') {
      const resumePath = '/portfolio-os/Rohit_Resume_Frontend_2.pdf';
      const link = document.createElement('a');
      link.href = resumePath;
      link.download = 'Rohit_Resume_Frontend.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    setActiveSection(id as PortfolioSectionId);
  };

  // Conditional rendering based on activeSection
  const renderSection = (): ReactNode => {
    switch (activeSection) {
      case 'portfolio-about':
        return <AboutMe {...aboutMeProps} />;
      case 'portfolio-projects':
        return <Projects projects={PROJECTS_DATA} />;
      case 'portfolio-skills':
        return <Skills items={SKILLS.items} />;
      case 'portfolio-workexp':
        return <WorkExperience experience={WORK_EXPERIENCE_DETAILS} />;
      case 'portfolio-resume':
        return <DownloadableResume />;
      default:
        return <AboutMe {...aboutMeProps} />;
    }
  };

  // Create button props with active state
  const navButtons = PORTFOLIO_NAV_BUTTONS.map((btn) => ({
    ...btn,
    isActive: btn.id === activeSection,
    onButtonClick: handleSectionChange,
  }));

  return (
    <div className="portfolio dark-theme">
      <Sidebar />
      <div className="portfolio__main">
        <PortfolioNavbar buttons={navButtons} />
        <div className="portfolio__section-wrapper">{renderSection()}</div>
      </div>
    </div>
  );
}

export default Portfolio;
```

**Key Patterns:**
- Local state with `useState` for UI state (activeSection)
- Callback pattern: `onButtonClick -> handleSectionChange`
- Conditional rendering: `renderSection()` switch case
- Props mapping: `PORTFOLIO_NAV_BUTTONS` transformed with `map()`

---

### Presentational Component (PortfolioNavbar.tsx)

```typescript
import { ComponentType } from 'react';
import './PortfolioNavbar.scss';
import { useMediaQuery } from '@hooks/useMediaQuery';

export interface ButtonDetailProps {
  name: string;
  onButtonClick: (id: string | number) => void;
  id: string | number;
  isActive: boolean;
  image: ComponentType<{ className?: string }> | string;
}

export interface PortfolioNavbarProps {
  buttons: ButtonDetailProps[];
}

function PortfolioNavbar({ buttons }: PortfolioNavbarProps) {
  // Responsive: Hide button names on mobile unless active
  const isMobileView = useMediaQuery('(max-width: 450px)');

  return (
    <nav className="portfolio-navbar">
      {buttons.map((item) => {
        const isFluentIcon = typeof item.image !== 'string';
        const FluentIconComponent = isFluentIcon ? item.image : null;
        const shouldShowName = !isMobileView || item.isActive;

        return (
          <button
            key={item.id}
            type="button"
            className={`portfolio-navbar__button ${
              item.isActive ? 'portfolio-navbar__button--active' : ''
            }`}
            onClick={() => item.onButtonClick(item.id)}
            aria-current={item.isActive ? 'page' : undefined}
            title={item.name}
          >
            {FluentIconComponent ? (
              <FluentIconComponent className="portfolio-navbar__fluent-icon" />
            ) : (
              <img
                src={item.image as string}
                alt={item.name}
                className="portfolio-navbar__image"
              />
            )}
            {shouldShowName && (
              <span className="portfolio-navbar__button-name">{item.name}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
}

export default PortfolioNavbar;
```

**Key Patterns:**
- Props interfaces for type safety
- Presentational: Only receives props, no state management
- Responsive logic: `useMediaQuery` hook for mobile detection
- Dynamic CSS classes: Conditional `className` based on `isActive`
- Accessibility: `aria-current` attribute

---

## Zustand Store Pattern

### Window Management Store

```typescript
import { create } from 'zustand';

interface WindowInstance {
  id: string;
  appId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
}

interface WindowStore {
  openWindows: WindowInstance[];
  activeWindowId: string | null;
  nextZIndex: number;

  openWindow: (appId: string, config: Partial<WindowInstance>) => void;
  closeWindow: (windowId: string) => void;
  setActiveWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, x: number, y: number) => void;
  updateWindowSize: (windowId: string, width: number, height: number) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  openWindows: [],
  activeWindowId: null,
  nextZIndex: 1,

  openWindow: (appId, config) => {
    set((state) => {
      const newWindow: WindowInstance = {
        id: `${appId}-${Date.now()}`,
        appId,
        position: config.position || { x: 100, y: 100 },
        size: config.size || { width: 800, height: 600 },
        zIndex: state.nextZIndex,
        isMinimized: false,
        ...config,
      };

      return {
        openWindows: [...state.openWindows, newWindow],
        activeWindowId: newWindow.id,
        nextZIndex: state.nextZIndex + 1,
      };
    });
  },

  closeWindow: (windowId) => {
    set((state) => ({
      openWindows: state.openWindows.filter((w) => w.id !== windowId),
      activeWindowId:
        state.activeWindowId === windowId ? null : state.activeWindowId,
    }));
  },

  setActiveWindow: (windowId) => {
    set((state) => {
      // Bring window to front by updating z-index
      const updatedWindows = state.openWindows.map((w) =>
        w.id === windowId ? { ...w, zIndex: state.nextZIndex } : w
      );

      return {
        openWindows: updatedWindows,
        activeWindowId: windowId,
        nextZIndex: state.nextZIndex + 1,
      };
    });
  },

  updateWindowPosition: (windowId, x, y) => {
    set((state) => ({
      openWindows: state.openWindows.map((w) =>
        w.id === windowId ? { ...w, position: { x, y } } : w
      ),
    }));
  },

  updateWindowSize: (windowId, width, height) => {
    set((state) => ({
      openWindows: state.openWindows.map((w) =>
        w.id === windowId ? { ...w, size: { width, height } } : w
      ),
    }));
  },
}));
```

**Key Patterns:**
- Single store for all window state
- Immutable updates with spread operator
- Setter functions with `set()` callback
- Derived logic: `nextZIndex` for z-index management
- Type-safe: Full TypeScript interfaces

---

## TypeScript Configuration

### Key Settings

Portfolio OS uses strict TypeScript configuration for maximum type safety:

- **Strict Mode:** Enabled - catches null/undefined errors at compile time
- **Target:** ES2020+ - modern JavaScript features
- **Module:** ESNext - enables tree-shaking
- **JSX:** React 19 - handles JSX syntax

**tsconfig.json excerpt:**
```json
{
  "compilerOptions": {
    "strict": true,
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "skipLibCheck": true,
    "moduleResolution": "bundler"
  }
}
```

### Type Definitions Best Practices

Store all shared types in a centralized location:

```typescript
// src/definitions/index.ts
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
  icon: ComponentType<{ className?: string }> | string;
  // ... other properties
}

export type PortfolioSectionId =
  | 'portfolio-about'
  | 'portfolio-projects'
  | 'portfolio-skills'
  | 'portfolio-workexp'
  | 'portfolio-resume';
```

### Avoiding Common TypeScript Pitfalls

**❌ Avoid `any` type:**
```typescript
// Bad - loses type safety
function processData(data: any) {
  return data.something;
}
```

**✅ Use specific types:**
```typescript
// Good - fully typed
interface DataInput {
  something: string;
}

function processData(data: DataInput) {
  return data.something;
}
```

**❌ Avoid implicit types:**
```typescript
// Bad - type is inferred as 'any'
const apiUrl = process.env.REACT_APP_API_URL;
```

**✅ Explicitly type variables:**
```typescript
// Good - explicit type
const apiUrl: string = process.env.REACT_APP_API_URL || '';
```

### Component Props Types

Always define props interfaces for components:

```typescript
// Good pattern
interface MyComponentProps {
  /** Unique identifier */
  id: string;

  /** Display text */
  label: string;

  /** Optional callback on click */
  onClick?: (id: string) => void;

  /** Optional className for styling */
  className?: string;
}

function MyComponent({
  id,
  label,
  onClick,
  className,
}: MyComponentProps) {
  return (
    <button className={className} onClick={() => onClick?.(id)}>
      {label}
    </button>
  );
}
```

### Generic Types for Reusability

```typescript
// Generic component for lists
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
<List
  items={projects}
  renderItem={(p) => <div>{p.title}</div>}
  keyExtractor={(p) => p.id}
/>
```

---

## Styling Patterns

### BEM Naming Convention

```scss
// Block
.portfolio {
  display: flex;
  gap: 1rem;

  // Element
  &__sidebar {
    width: 300px;
    background: var(--color-sidebar);
  }

  &__main {
    flex: 1;
    overflow: hidden;
  }

  // Element
  &__section-wrapper {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}

// Separate component block
.portfolio-navbar {
  display: flex;
  gap: 0.5rem;

  // Element
  &__button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    cursor: pointer;

    // Modifier - Active state
    &--active {
      background: var(--color-primary);
      color: white;
    }

    // Nested element
    &:hover {
      background: var(--color-hover);
    }
  }

  // Element
  &__button-name {
    font-weight: 500;
  }

  // Modifier for mobile
  &--mobile {
    flex-direction: column;
  }
}
```

**Key Patterns:**
- Block: Main component (`.portfolio`)
- Element: Child of block (`.portfolio__sidebar`)
- Modifier: Variation (`.portfolio-navbar__button--active`)
- No nesting beyond 2-3 levels
- Variables for consistency

---

### Responsive Design

```scss
// Mobile-first approach
.portfolio-navbar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &__button-name {
    display: none; // Hide on mobile
  }

  &__button--active &__button-name {
    display: inline; // Show only when active
  }

  // Desktop breakpoint
  @media (min-width: 768px) {
    flex-direction: row;

    &__button-name {
      display: inline; // Show all on desktop
    }
  }
}

// Using mixins for cleaner code
.portfolio {
  padding: 1rem;

  @include media-mobile {
    padding: 0.5rem;
  }

  @include media-tablet {
    padding: 0.75rem;
  }
}
```

---

## TypeScript Type Definitions

### Common Types

```typescript
// src/definitions/index.ts

// Portfolio data types
export interface AboutMeDetails {
  name: string;
  education: EducationItem[];
  otherActitvities: Activity[];
  quote: string;
}

export interface EducationItem {
  institution: string;
  degree: string;
  duration: string;
  description?: string;
}

export interface Activity {
  title: string;
  description: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  links: {
    live?: string;
    github?: string;
    figma?: string;
  };
}

// Window types
export interface WindowInstance {
  id: string;
  appId: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMinimized: boolean;
}

// Portfolio sections
export type PortfolioSectionId =
  | 'portfolio-about'
  | 'portfolio-projects'
  | 'portfolio-skills'
  | 'portfolio-workexp'
  | 'portfolio-resume';
```

---

## Constants Pattern

### Portfolio Constants

```typescript
// src/constants/portfolioConstants.ts

import {
  AboutMeDetails,
  WorkExperience,
  Project,
} from '@definitions';

export const ABOUT_ME_DETAILS: AboutMeDetails = {
  name: 'Rohit Savart',
  education: [
    {
      institution: 'University Name',
      degree: 'Bachelor in Computer Science',
      duration: '2020 - 2024',
      description: 'Focused on web development and software engineering',
    },
  ],
  otherActitvities: [
    {
      title: 'Full Stack Development Certification',
      description: 'Completed comprehensive course covering frontend and backend',
    },
  ],
  quote: 'Building things that matter, one line of code at a time.',
};

export const WORK_EXPERIENCE_DETAILS: WorkExperience[] = [
  {
    company: 'Tech Company Name',
    position: 'Full Stack Developer',
    duration: 'Jan 2023 - Present',
    description: 'Developing full-stack web applications using React and Node.js',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'portfolio-os',
    title: 'Portfolio OS',
    description: 'Windows 11-inspired portfolio with desktop environment',
    image: '/assets/images/specifics/portfolio-os.png',
    technologies: ['React', 'TypeScript', 'Zustand', 'SCSS'],
    links: {
      github: 'https://github.com/NatsuDrag9/portfolio-os',
      live: 'https://natsudrag9.github.io/portfolio-os/',
    },
  },
];

export const SKILLS = {
  items: [
    {
      category: 'Frontend',
      skills: ['React', 'TypeScript', 'SCSS', 'Vite'],
    },
    {
      category: 'State Management',
      skills: ['Zustand', 'React Hooks'],
    },
    {
      category: 'Tools',
      skills: ['Git', 'GitHub', 'VS Code', 'Storybook'],
    },
  ],
};
```

---

## Custom Hooks Pattern

### useMediaQuery Hook

```typescript
// src/hooks/useMediaQuery.ts

import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create media query list
    const mediaQueryList = window.matchMedia(query);

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Create event listener
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    // Add listener
    mediaQueryList.addEventListener('change', handleChange);

    // Cleanup
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}

// Usage in component
function MyComponent() {
  const isMobile = useMediaQuery('(max-width: 450px)');
  return <div>{isMobile ? 'Mobile View' : 'Desktop View'}</div>;
}
```

---

## Storybook Pattern

### Component Stories

```typescript
// src/components/PortfolioNavbar/PortfolioNavbar.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';
import PortfolioNavbar, { ButtonDetailProps } from './PortfolioNavbar';
import { BriefcaseRegular } from '@fluentui/react-icons';

const meta: Meta<typeof PortfolioNavbar> = {
  component: PortfolioNavbar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockButtons: ButtonDetailProps[] = [
  {
    id: 'about',
    name: 'About',
    isActive: true,
    image: BriefcaseRegular,
    onButtonClick: (id) => console.log('Clicked:', id),
  },
  {
    id: 'projects',
    name: 'Projects',
    isActive: false,
    image: BriefcaseRegular,
    onButtonClick: (id) => console.log('Clicked:', id),
  },
];

export const Default: Story = {
  args: {
    buttons: mockButtons,
  },
};

export const WithManyButtons: Story = {
  args: {
    buttons: [
      ...mockButtons,
      {
        id: 'skills',
        name: 'Skills',
        isActive: false,
        image: BriefcaseRegular,
        onButtonClick: (id) => console.log('Clicked:', id),
      },
    ],
  },
};
```

---

## Event Handling Patterns

### Form Input Handling

```typescript
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Generic change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Process form data
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Your name"
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Message"
      />
      <button type="submit">Send</button>
    </form>
  );
}
```

---

## Error Handling Patterns

### Try-Catch with Feedback

```typescript
async function fetchUserData(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setUserData(data);
  } catch (error) {
    console.error('Failed to fetch user:', error);
    showErrorToast('Failed to load user data');
  }
}
```

---

## Related Documentation

- [Data Flow](./DATA_FLOW.md) - How data flows through the app
- [Component Relationships](./COMPONENT_RELATIONSHIPS.md) - Component hierarchy
- [UI Flow](./UI_FLOW.md) - User interactions and navigation
- [Feature Walkthroughs](./FEATURE_WALKTHROUGHS.md) - Step-by-step examples
- [Design & Architecture](./DESIGN_AND_ARCHITECTURE.md) - Main overview
