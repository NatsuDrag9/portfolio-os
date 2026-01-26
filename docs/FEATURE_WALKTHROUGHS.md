# Feature Walkthroughs

Step-by-step code walkthroughs of key features with actual implementation details.

---

## Feature 1: Opening a Window (Portfolio App)

### Step 1: User Clicks Start Menu Icon

**File:** `src/apps/recommended/DefaultApp.tsx`

```typescript
function StartMenuIcon() {
  const toggleStartMenu = useUiStore((state) => state.toggleStartMenu);

  return (
    <button onClick={() => toggleStartMenu()}>
      Start Menu Icon
    </button>
  );
}
```

### Step 2: Start Menu Opens, User Clicks Portfolio

**File:** `src/apps/recommended/StartMenu.tsx`

```typescript
function StartMenu() {
  const startMenuOpen = useUiStore((state) => state.startMenuOpen);
  const openWindow = useWindowStore((state) => state.openWindow);

  const handleAppClick = (appId: string) => {
    openWindow(appId, {
      position: { x: 100, y: 100 },
      size: { width: 800, height: 600 },
    });
  };

  return (
    startMenuOpen && (
      <div className="start-menu">
        <div className="app-grid">
          {APP_ICONS.map((app) => (
            <button
              key={app.id}
              onClick={() => handleAppClick(app.id)}
              className="app-icon"
            >
              {app.icon} {app.name}
            </button>
          ))}
        </div>
      </div>
    )
  );
}
```

### Step 3: Store Updates with openWindow Action

**File:** `src/store/useWindowStore.ts`

```typescript
openWindow: (appId, config) => {
  set((state) => {
    const newWindow: WindowInstance = {
      id: `${appId}-${Date.now()}`, // 'portfolio-default-1234567'
      appId,
      position: config.position || { x: 100, y: 100 },
      size: config.size || { width: 800, height: 600 },
      zIndex: state.nextZIndex,       // Auto-increment z-index
      isMinimized: false,
      ...config,
    };

    return {
      openWindows: [...state.openWindows, newWindow], // Add to array
      activeWindowId: newWindow.id,                   // Set as active
      nextZIndex: state.nextZIndex + 1,              // Increment
    };
  });
}
```

### Step 4: DefaultApp Re-renders with New Window

**File:** `src/apps/recommended/DefaultApp.tsx`

```typescript
function DefaultApp() {
  const openWindows = useWindowStore((state) => state.openWindows);

  return (
    <div className="desktop">
      <Background />
      <Taskbar />
      <StartMenu />

      {/* Map openWindows and render each */}
      {openWindows.map((windowData) => (
        <Window key={windowData.id} windowData={windowData}>
          <AppContainer appId={windowData.appId} />
        </Window>
      ))}
    </div>
  );
}
```

### Step 5: Window Component Renders with App Inside

**File:** `src/components/Window/Window.tsx`

```typescript
function Window({ windowData, children }: WindowProps) {
  const updatePosition = useWindowStore((state) => state.updateWindowPosition);
  const setActiveWindow = useWindowStore((state) => state.setActiveWindow);

  const windowStyle = {
    transform: `translate(${windowData.position.x}px, ${windowData.position.y}px)`,
    width: `${windowData.size.width}px`,
    height: `${windowData.size.height}px`,
    zIndex: windowData.zIndex,
  };

  const handleDrag = (e: MouseEvent) => {
    // Update position while dragging
    updatePosition(windowData.id, e.clientX, e.clientY);
  };

  return (
    <div
      className="window"
      style={windowStyle}
      onMouseDown={() => setActiveWindow(windowData.id)}
    >
      <div className="window__title-bar">
        <span>{windowData.appId}</span>
        <button>Close</button>
      </div>
      <div className="window__content">{children}</div>
    </div>
  );
}
```

### Step 6: Portfolio App Renders Inside Window

**File:** `src/apps/default/Portfolio/Portfolio.tsx`

```typescript
function Portfolio() {
  const [activeSection, setActiveSection] = useState('portfolio-about');

  return (
    <div className="portfolio">
      <Sidebar /> {/* Shows personal info */}
      <div className="portfolio__main">
        <PortfolioNavbar
          buttons={navButtons}
          onButtonClick={(id) => setActiveSection(id)}
        />
        <div className="portfolio__section-wrapper">
          {/* Displays selected section */}
          {activeSection === 'portfolio-about' && <AboutMe />}
        </div>
      </div>
    </div>
  );
}
```

### Result
✅ User sees Portfolio app in a draggable window on desktop

---

## Feature 2: Resume Download

### Step 1: User in Portfolio App, Clicks Resume Button

**File:** `src/components/PortfolioNavbar/PortfolioNavbar.tsx`

```typescript
const buttons = [
  {
    id: 'portfolio-resume',
    name: 'Resume',
    isActive: id === 'portfolio-resume',
    onButtonClick: handleSectionChange, // Parent callback
  },
  // ... other buttons
];

{buttons.map((btn) => (
  <button key={btn.id} onClick={() => btn.onButtonClick(btn.id)}>
    {btn.name}
  </button>
))}
```

### Step 2: Parent Component (Portfolio) Handles Click

**File:** `src/apps/default/Portfolio/Portfolio.tsx`

```typescript
const handleSectionChange = (id: string | number) => {
  // SPECIAL CASE: Resume button has download logic
  if (id === 'portfolio-resume') {
    // Create temporary anchor element
    const resumePath = '/portfolio-os/Rohit_Resume_Frontend_2.pdf';
    const link = document.createElement('a');

    // Configure anchor
    link.href = resumePath;
    link.download = 'Rohit_Resume_Frontend.pdf'; // Filename user sees

    // Add to DOM temporarily
    document.body.appendChild(link);

    // Trigger browser download
    link.click();

    // Clean up - remove from DOM
    document.body.removeChild(link);
  }

  // Update section state (happens regardless)
  setActiveSection(id as PortfolioSectionId);
};
```

### Step 3: Browser Initiates Download

**HTTP Request:**
```
GET /portfolio-os/Rohit_Resume_Frontend_2.pdf HTTP/1.1
Host: yourusername.github.io
```

**Server Response:**
```
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="Rohit_Resume_Frontend.pdf"
[PDF FILE CONTENT]
```

### Step 4: Resume Section Renders

**File:** `src/apps/default/DownloadableResume/DownloadableResume.tsx`

```typescript
function DownloadableResume() {
  return (
    <div className="download-resume">
      <h6 className="download-resume__title">
        Your resume is being downloaded...
      </h6>
      {/* Button removed - download happens immediately */}
    </div>
  );
}
```

### Result
✅ Resume downloads to user's computer immediately when Resume button is clicked

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

## Feature 5: Dragging Windows

### Step 1: User Mouse Down on Window Title Bar

**File:** `src/components/Window/Window.tsx`

```typescript
function Window({ windowData }: WindowProps) {
  const updateWindowPosition = useWindowStore(
    (state) => state.updateWindowPosition
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = windowData.position.x;
    const initialY = windowData.position.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      // Calculate new position
      const newX = initialX + deltaX;
      const newY = initialY + deltaY;

      // Update store immediately (smooth drag)
      updateWindowPosition(windowData.id, newX, newY);
    };

    const handleMouseUp = () => {
      // Stop listening to movement
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      className="window"
      style={{
        transform: `translate(${windowData.position.x}px, ${windowData.position.y}px)`,
      }}
    >
      <div
        className="window__title-bar"
        onMouseDown={handleMouseDown}
      >
        {/* Title */}
      </div>
      {/* Content */}
    </div>
  );
}
```

### Step 2: Store Updates Position

**File:** `src/store/useWindowStore.ts`

```typescript
updateWindowPosition: (windowId, x, y) => {
  set((state) => ({
    openWindows: state.openWindows.map((w) =>
      w.id === windowId
        ? { ...w, position: { x, y } } // Update position
        : w
    ),
  }));
}
```

### Step 3: DOM Updates with Transform

```typescript
style={{
  transform: `translate(${newX}px, ${newY}px)`,
}}
```

**CSS:**
```scss
.window {
  position: absolute;
  transform: translate3d(x, y, 0); // GPU-accelerated
  transition: none; // Instant for smooth drag
}
```

### Step 4: Mouse Up - Drag Ends

Position is now saved in store at final location

### Result
✅ User can drag window smoothly around desktop

---

## Related Documentation

- [UI Flow](./UI_FLOW.md) - Visual flow diagrams
- [Data Flow](./DATA_FLOW.md) - How data moves
- [Component Relationships](./COMPONENT_RELATIONSHIPS.md) - Component hierarchy
- [Implementation Details](./IMPLEMENTATION_DETAILS.md) - Code patterns
- [Design & Architecture](./DESIGN_AND_ARCHITECTURE.md) - Overview
