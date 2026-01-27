# Feature Walkthroughs

Step-by-step code walkthroughs of key features with actual implementation details.

---

## Feature 1: Opening a Window (Portfolio App)

### Step 1: User Toggles Start Menu

**File:** `src/screens/Workspace/Workspace.tsx`

The Workspace component renders the StartMenu component:

```typescript
function Workspace() {
  // ...
  const renderWithLoader = () => {
    return (
      <>
        <Desktop />
        <WindowManager />
        <StartMenu />  {/* Start Menu is rendered here */}
      </>
    );
  };

  return (
    <div className="workspace">
      {/* ... */}
      {renderWithLoader()}
      <Taskbar />
    </div>
  );
}
```

### Step 2: Start Menu Opens, User Clicks Portfolio App

**File:** `src/components/StartMenu/StartMenu.tsx`

When user clicks an app icon, it calls `addWindow()` from the store:

```typescript
// StartMenu retrieves addWindow action from store
const { addWindow } = useWorkspaceState();

// When user clicks Portfolio icon:
const handleAppClick = (appMetadata: AppMetadata) => {
  addWindow(appMetadata.id, appMetadata);
};
```

### Step 3: Store Updates Windows with addWindow Action

**File:** `src/store/store.ts` - `useWorkspaceState`

```typescript
addWindow: (appId: string, appMetadata: AppMetadata) => {
  set((state) => {
    // Increment instance counter for this app
    const instanceCount = (state.windowInstanceCounters[appId] || 0) + 1;
    const windowId = `${appId}-${instanceCount}`;

    // Create new window data
    const newWindow: WindowData = {
      id: windowId,
      title: appMetadata.appName,
      windowName: appMetadata.windowName,
      isMaximized: 'normal',
      previousDisplayState: 'normal',
      position: { x: 100, y: 80 },
      zIndex: state.activeWindows.length + 1,
      size: { width: 700, height: 400 },
      customTheme: undefined,
      snapPosition: 'fullscreen',
    };

    return {
      activeWindows: [...state.activeWindows, newWindow],
      windowInstanceCounters: {
        ...state.windowInstanceCounters,
        [appId]: instanceCount,
      },
    };
  });
};
```

### Step 4: WindowManager Maps Windows to Components

**File:** `src/components/WindowManager/WindowManager.tsx`

The WindowManager subscribes to `activeWindows` and renders each window:

```typescript
function WindowManager() {
  const { activeWindows } = useWorkspaceState();

  const renderWindowContent = (windowName: string, windowId: string) => {
    switch (windowName) {
      case 'Portfolio':
        return <Portfolio key={windowId} />;
      case 'PortfolioSection': {
        // Extract appId from windowId (format: 'portfolio-about-1')
        const appId = windowId.substring(0, windowId.lastIndexOf('-'));
        return <PortfolioSection key={windowId} appId={appId} />;
      }
      // ... other cases
      default:
        return null;
    }
  };

  return (
    <>
      {activeWindows
        .filter((window): window is typeof window & { id: string; windowName: string } =>
          !!window.id && !!window.windowName
        )
        .map((window) => {
          const content = renderWindowContent(window.windowName, window.id);
          if (!content) return null;

          return (
            <WindowContainer key={window.id} windowId={window.id}>
              {content}
            </WindowContainer>
          );
        })}
    </>
  );
}
```

### Step 5: WindowContainer Renders Window with Controls

**File:** `src/components/WindowContainer/WindowContainer.tsx`

The WindowContainer component wraps the app content with window controls (minimize, maximize, close):

```typescript
function WindowContainer({ children, windowId }: WindowContainerProps) {
  const {
    activeWindows,
    setWindowIsMaximized,
    requestCloseWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWorkspaceState();

  const windowData = useMemo(
    () => activeWindows.find((w) => w.id === windowId),
    [activeWindows, windowId]
  );

  const handleWindowDisplayClick = (displayType: WindowDisplayType) => {
    if (displayType === 'maximized') {
      const newState =
        windowData?.isMaximized === 'maximized' ? 'normal' : 'maximized';
      setWindowIsMaximized(windowId, newState);
      return;
    }
    setWindowIsMaximized(windowId, displayType);
  };

  return (
    <Rnd
      position={{
        x: isMobileFullscreen ? 0 : defaultX,
        y: isMobileFullscreen ? 0 : defaultY,
      }}
      size={{
        width: isMobileFullscreen ? '100%' : defaultWidth,
        height: isMobileFullscreen ? '100%' : defaultHeight,
      }}
      onDragStop={(_e, d) => {
        updateWindowPosition(windowId, d.x, d.y);
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        updateWindowSize(windowId, ref.offsetWidth, ref.offsetHeight);
        updateWindowPosition(windowId, position.x, position.y);
      }}
    >
      <div className="window-container__top">
        <h5 className="window-container__title">
          {windowData?.title ?? 'Untitled'}
        </h5>
        <div className="window-container__window-buttons">
          <button onClick={() => handleWindowDisplayClick('minimized')}>
            <SubtractRegular />
          </button>
          <button onClick={() => handleWindowDisplayClick('maximized')}>
            <SquareMultipleRegular />
          </button>
          <button onClick={() => requestCloseWindow(windowId)}>
            <DismissRegular />
          </button>
        </div>
      </div>
      <div className="window-container__paint">{children}</div>
    </Rnd>
  );
}
```

### Step 6: Portfolio App Renders Inside WindowContainer

**File:** `src/apps/default/Portfolio/Portfolio.tsx`

```typescript
function Portfolio() {
  const [activeSection, setActiveSection] =
    useState<PortfolioSectionId>('portfolio-about');

  const handleSectionChange = (id: string | number) => {
    // Trigger resume download if Resume button is clicked
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

  const navButtons: ButtonDetailProps[] = PORTFOLIO_NAV_BUTTONS.map((btn) => ({
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
```

### Result

✅ User sees Portfolio app in a draggable, resizable window on desktop

---

## Feature 2: Resume Download

### Step 1: User Clicks Resume Button in Portfolio Navbar

**File:** `src/components/PortfolioNavbar/PortfolioNavbar.tsx`

The PortfolioNavbar receives button data with a callback:

```typescript
interface ButtonDetailProps {
  id: string;
  name: string;
  image: React.ComponentType;
  isActive: boolean;
  onButtonClick: (id: string | number) => void;
}

// Buttons are passed from Portfolio component with onButtonClick = handleSectionChange
{buttons.map((btn) => (
  <button
    key={btn.id}
    onClick={() => btn.onButtonClick(btn.id)}
    className={`portfolio-navbar__button ${
      btn.isActive ? 'portfolio-navbar__button--active' : ''
    }`}
  >
    <ItemIcon image={btn.image} />
    {shouldShowName && (
      <span className="portfolio-navbar__button-name">
        {btn.name}
      </span>
    )}
  </button>
))}
```

### Step 2: Portfolio Component Handles Resume Click

**File:** `src/apps/default/Portfolio/Portfolio.tsx`

When user clicks Resume button, `handleSectionChange` is called:

```typescript
const handleSectionChange = (id: string | number) => {
  // Trigger resume download if Resume button is clicked
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
```

### Step 3: Browser Initiates Download

The browser receives the download request and starts downloading the PDF:

```
GET /portfolio-os/Rohit_Resume_Frontend_2.pdf HTTP/1.1
Host: natsudrag9.github.io
Accept: application/pdf
```

**Server Response:**

```
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="Rohit_Resume_Frontend.pdf"
Content-Length: [PDF SIZE]
[PDF FILE CONTENT]
```

### Step 4: DownloadableResume Component Renders

**File:** `src/apps/default/DownloadableResume/DownloadableResume.tsx`

Once the Resume section is selected, this component renders:

```typescript
function DownloadableResume() {
  // Automatic download is now triggered in Portfolio.tsx handleSectionChange
  // and in PortfolioSection.tsx when opened from desktop

  return (
    <div className="download-resume">
      <h6 className="download-resume__title">
        Your resume is being downloaded...
      </h6>
    </div>
  );
}
```

### Step 5: Desktop Resume Download (PortfolioSection)

When user opens Resume from desktop/start menu (PortfolioSection):

**File:** `src/apps/default/Portfolio/PortfolioSection.tsx`

```typescript
function PortfolioSection({ appId }: PortfolioSectionProps) {
  const hasDownloadedRef = useRef(false);

  useEffect(() => {
    // Trigger resume download when Resume section is opened (only once)
    if (appId === 'portfolio-resume' && !hasDownloadedRef.current) {
      hasDownloadedRef.current = true;
      const resumePath = '/portfolio-os/Rohit_Resume_Frontend_2.pdf';
      const link = document.createElement('a');
      link.href = resumePath;
      link.download = 'Rohit_Resume_Frontend.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [appId]);

  return <div className="portfolio-section dark-theme">{renderSection()}</div>;
}
```

### Result

✅ Resume downloads immediately whether clicked from navbar or opened as a separate window

---

## Feature 3: Portfolio Section Navigation

### Step 1: Load Portfolio with About Section (Default)

```typescript
const [activeSection, setActiveSection] = useState<PortfolioSectionId>(
  'portfolio-about' // Initial state
);
```

### Step 2: User Clicks Projects Button

```typescript
// Button onClick -> handleSectionChange('portfolio-projects')
```

### Step 3: State Updates

```typescript
setActiveSection('portfolio-projects');
// React re-render triggered
```

### Step 4: renderSection() Called

```typescript
const renderSection = (): ReactNode => {
  switch (activeSection) {
    case 'portfolio-about':
      return <AboutMe {...props} />;

    case 'portfolio-projects':
      // NOW this case matches
      return <Projects projects={PROJECTS_DATA} />;

    case 'portfolio-skills':
      return <Skills items={SKILLS.items} />;

    // ... other cases
  }
};
```

### Step 5: Projects Component Renders

**File:** `src/apps/default/Projects/Projects.tsx`

```typescript
function Projects({ projects }: ProjectsProps) {
  return (
    <div className="projects">
      <h2>My Projects</h2>
      <div className="projects__grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card">
      <img src={project.image} alt={project.title} />
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="technologies">
        {project.technologies.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <div className="links">
        {project.links.github && (
          <a href={project.links.github}>GitHub</a>
        )}
        {project.links.live && (
          <a href={project.links.live}>Live Demo</a>
        )}
      </div>
    </div>
  );
}
```

### Step 6: Navigation Button Updates Visual State

```typescript
const navButtons = PORTFOLIO_NAV_BUTTONS.map((btn) => ({
  ...btn,
  isActive: btn.id === activeSection, // 'portfolio-projects' === activeSection
  onButtonClick: handleSectionChange,
}));
```

**Projects button now has `isActive: true`**

**CSS:**

```scss
.portfolio-navbar__button {
  &--active {
    background: var(--color-primary);
    color: white;
  }
}
```

### Result

✅ Projects section displays with active button styling

---

## Feature 4: Responsive Mobile Navigation

### Step 1: Component Checks Screen Size

**File:** `src/components/PortfolioNavbar/PortfolioNavbar.tsx`

```typescript
function PortfolioNavbar({ buttons }: PortfolioNavbarProps) {
  // Hook that listens to media query changes
  const isMobileView = useMediaQuery('(max-width: 450px)');

  return (
    <nav className="portfolio-navbar">
      {buttons.map((item) => {
        // Show name only on desktop OR when button is active
        const shouldShowName = !isMobileView || item.isActive;

        return (
          <button
            key={item.id}
            className={`portfolio-navbar__button ${
              item.isActive ? 'portfolio-navbar__button--active' : ''
            }`}
            onClick={() => item.onButtonClick(item.id)}
          >
            {/* Icon */}
            <ItemIcon image={item.image} />

            {/* Name - conditionally rendered */}
            {shouldShowName && (
              <span className="portfolio-navbar__button-name">
                {item.name}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
```

### Step 2: useMediaQuery Hook Evaluates

**File:** `src/hooks/useMediaQuery.ts`

```typescript
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Query: "(max-width: 450px)"
    const mediaQueryList = window.matchMedia(query);

    // Initial check
    setMatches(mediaQueryList.matches); // true if width <= 450px

    // Listen for changes
    const handleChange = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
```

### Step 3: Desktop View (> 450px)

```
isMobileView = false
shouldShowName = true (always show)

Renders:
[Icon] Button Name
[Icon] Projects
[Icon] Skills
```

### Step 4: Mobile View (<= 450px)

```
isMobileView = true
shouldShowName = item.isActive (only active)

Renders:
[Icon]           // About (inactive)
[Icon] Projects  // Projects (active)
[Icon]           // Skills (inactive)
```

### Step 5: Window Resize

User resizes browser below 450px breakpoint:

```typescript
// mediaQueryList fires 'change' event
// handleChange called with new matches value
// setMatches updates state
// Component re-renders
// Navigation changes to mobile layout
```

### Result

✅ Navigation adapts automatically to screen size

---

## Feature 5: Dragging and Resizing Windows

### Step 1: WindowContainer Uses React-RND for Drag & Resize

**File:** `src/components/WindowContainer/WindowContainer.tsx`

The WindowContainer component wraps windows with the `Rnd` (React-No-Drag) library for dragging and resizing:

```typescript
function WindowContainer({ children, windowId }: WindowContainerProps) {
  const {
    activeWindows,
    updateWindowPosition,
    updateWindowSize,
  } = useWorkspaceState();

  const windowData = useMemo(
    () => activeWindows.find((w) => w.id === windowId),
    [activeWindows, windowId]
  );

  const defaultX = windowData?.position?.x ?? 50;
  const defaultY = windowData?.position?.y ?? 50;
  const defaultWidth = windowData?.size?.width ?? 450;
  const defaultHeight = windowData?.size?.height ?? 300;

  return (
    <Rnd
      position={{ x: defaultX, y: defaultY }}
      size={{ width: defaultWidth, height: defaultHeight }}
      minWidth={600}
      minHeight={400}
      bounds="parent"
      onDragStop={(_e, d) => {
        updateWindowPosition(windowId, d.x, d.y);
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        updateWindowSize(windowId, ref.offsetWidth, ref.offsetHeight);
        updateWindowPosition(windowId, position.x, position.y);
      }}
      dragHandleClassName="window-container__top"
      className={`window-container window-container--${windowData?.isMaximized}`}
    >
      <div className="window-container__top">
        <h5 className="window-container__title">
          {windowData?.title ?? 'Untitled'}
        </h5>
        {/* Window control buttons (minimize, maximize, close) */}
      </div>
      <div className="window-container__paint">{children}</div>
    </Rnd>
  );
}
```

### Step 2: User Drags Window Title Bar

When user clicks and holds on the window title bar (the `dragHandleClassName="window-container__top"`), Rnd library:

1. Captures the mouse down event
2. Tracks mouse movement
3. Continuously updates window position while dragging
4. Fires `onDragStop` callback when mouse is released

### Step 3: Store Updates Position on Drag Stop

**File:** `src/store/store.ts`

When drag ends, the store is updated with the new position:

```typescript
updateWindowPosition: (windowId: string, x: number, y: number) => {
  set((state) => ({
    activeWindows: state.activeWindows.map((w) =>
      w.id === windowId ? { ...w, position: { x, y } } : w
    ),
  }));
};
```

### Step 4: User Resizes Window

Similarly for resizing, when user drags a window edge/corner:

1. Rnd detects resize action
2. Fires `onResizeStop` callback with new dimensions and position
3. Both `updateWindowSize` and `updateWindowPosition` are called

```typescript
updateWindowSize: (windowId: string, width: number, height: number) => {
  set((state) => ({
    activeWindows: state.activeWindows.map((w) =>
      w.id === windowId ? { ...w, size: { width, height } } : w
    ),
  }));
};
```

### Step 5: Position is Persisted in Store

The updated position and size are now saved in the `activeWindows` state, allowing:

- Window state to persist if page refreshes
- Multiple windows to maintain their positions independently
- Window state to be restored when switching between applications

### Result

✅ User can drag and resize windows smoothly with Rnd library handling all mouse event tracking

---
