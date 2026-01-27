# Data Flow

How data moves through Portfolio OS - from initialization through user interactions to the final UI render.

---

## Initialization Data Flow

### From App Load to Desktop Ready

```mermaid
graph TD
    A["index.html Loads<br/>Browser Parses HTML"]
    B["Execute main.tsx<br/>React Entry Point"]
    C["ReactDOM.render<br/>Root Component"]

    A --> B --> C

    C --> D["App.tsx Mounts"]
    D --> E["Zustand Store<br/>Initializes"]

    E --> E1["useWorkspaceState<br/>activeWindows: []<br/>windowInstanceCounters: {}"]
    E --> E2["useSystemUIState<br/>currentTheme: 'light'<br/>startMenuOpen: false"]
    E --> E3["useAuth<br/>username<br/>isAdmin"]

    E1 --> F["Store Ready"]
    E2 --> F
    E3 --> F

    F --> G["Workspace.tsx<br/>Mounts"]
    G --> H["Initialize Desktop<br/>Components"]

    H --> I["Load Desktop<br/>Background/Wallpaper"]
    I --> J["Load Taskbar<br/>Component"]
    J --> K["Load Start Menu<br/>Component"]
    K --> L["Load System Tray<br/>Component"]

    L --> M["All Components<br/>Mounted & Ready"]

    M --> N["Initial Render<br/>to DOM"]
    N --> O["Desktop Visible<br/>Waiting for User<br/>Interaction"]
```

### Constants Loading

```mermaid
graph TD
    A["App Initialization"]
    B["Import Constants<br/>at Top Level"]

    A --> B

    B --> B1["portfolioConstants.ts<br/>ABOUT_ME_DETAILS<br/>WORK_EXPERIENCE_DETAILS<br/>SKILLS<br/>PROJECTS_DATA"]
    B --> B2["appConstants.ts<br/>GITHUB_LINK<br/>PORTFOLIO_LINK<br/>etc."]

    B1 --> C["Constants in Memory"]
    B2 --> C

    C --> D["Components Import<br/>as Needed"]
    D --> D1["Portfolio App<br/>imports portfolioConstants"]
    D --> D2["Sidebar<br/>imports sidebarConstants"]

    D1 --> E["Constants Available<br/>to Components"]
    D2 --> E

    E --> F["Render with Data<br/>No API Calls Needed"]
```

---

## Global State Management

### Zustand Store Architecture

```mermaid
graph TD
    A["Zustand Store<br/>Global State"]

    A --> B["useWorkspaceState<br/>Window Management"]
    A --> C["useSystemUIState<br/>UI & Theme Settings"]
    A --> D["useAuth<br/>Authentication"]
    A --> E["useBootStatus<br/>Boot Sequence"]

    B --> B1["State:<br/>activeWindows: []<br/>windowInstanceCounters<br/>taskbarPinnedAppIds"]
    B --> B2["Actions:<br/>addWindow<br/>removeWindow<br/>updateWindowPosition<br/>setWindowIsMaximized"]

    C --> C1["State:<br/>currentTheme<br/>startMenuOpen<br/>brightnessLevel"]
    C --> C2["Actions:<br/>setTheme<br/>setStartMenuOpen<br/>setBrightnessLevel"]

    D --> D1["State:<br/>username<br/>isAdmin<br/>isReadOnlyMode"]
    D --> D2["Actions:<br/>updateAuthState<br/>updateUserAvatar"]

    E --> E1["State:<br/>bootStatus<br/>allOperations"]
    E --> E2["Actions:<br/>updateBootStatus"]
```

---

## Component Subscription Model

### How Components Access Store Data

```mermaid
graph TD
    A["Component Mounts<br/>useWorkspaceState Hook"]
    B["Subscribe to Store"]
    C["Store Returns State<br/>+ Actions"]

    A --> B --> C

    C --> D["Component Renders<br/>with Current State"]
    D --> E["Store State<br/>Changes"]
    E --> F["Subscriber Notified<br/>Re-render Triggered"]
    F --> D
```

**Example Code Pattern:**

```typescript
function WindowManager() {
  // Subscribe to specific parts of store
  const activeWindows = useWorkspaceState((state) => state.activeWindows);
  const removeWindow = useWorkspaceState((state) => state.removeWindow);

  // Component has data and actions
  return (
    <>
      {activeWindows.map(w => (
        <WindowContainer key={w.id} windowId={w.id}>
          {/* Window content */}
        </WindowContainer>
      ))}
    </>
  );
}
```

---

## Application-Level Data Flow

### Complete Desktop System

```mermaid
graph TD
    A["User Interaction<br/>Click, Drag, etc"]

    A --> B["Event Handler<br/>in Component"]
    B --> C["Dispatch Action<br/>to Zustand Store"]

    C --> D["Store Reducer<br/>Updates State"]
    D --> E["All Subscribed<br/>Components Notified"]

    E --> F["React Re-render<br/>Cycle"]
    F --> G["Components Receive<br/>New Props/State"]

    G --> H["DOM Updates<br/>Virtual DOM Diff"]
    H --> I["Browser Renders<br/>Visual Update"]

    I --> J["User Sees<br/>Result of Action"]

    style A fill:#e1f5
    style J fill:#e1f5
```

---

## Window Management Data Flow

### Opening a Window

```mermaid
sequenceDiagram
    participant User
    participant Component as UI Component
    participant Store as useWorkspaceState
    participant WindowMgr as WindowManager

    User->>Component: Click App Icon
    Component->>Component: Handler Triggered
    Component->>Store: Dispatch addWindow<br/>appId, appMetadata

    Store->>Store: Generate windowId<br/>Increment instance counter<br/>Set initial position

    Store->>Store: Update State:<br/>activeWindows.push({<br/>  id: 'portfolio-1'<br/>  title: 'Portfolio'<br/>  windowName: 'Portfolio'<br/>  position: {x:100, y:80}<br/>  size: {w:700, h:400}<br/>  zIndex: 2<br/>})

    Store-->>WindowMgr: Notify of State Change
    WindowMgr->>WindowMgr: Re-render
    WindowMgr->>WindowMgr: Map activeWindows<br/>Array
    WindowMgr->>WindowMgr: Render WindowContainer<br/>Components

    WindowMgr-->>User: Window Appears<br/>on Screen
```

**State Shape:**

```typescript
interface WindowData {
  id: string;              // 'portfolio-1'
  title: string;           // 'Portfolio'
  windowName: string;      // 'Portfolio' (maps to app in WindowManager)
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMaximized: WindowDisplayType; // 'normal' | 'maximized' | 'minimized'
  // ... other properties
}

// Store state
{
  activeWindows: WindowData[],
  windowInstanceCounters: Record<string, number>
}
```

---

### Updating Window Position (Drag)

```mermaid
graph TD
    A["User Drags Window<br/>onMouseDown Fires"]
    B["Calculate New X, Y<br/>Based on Mouse Position"]
    C["Dispatch<br/>updateWindowPosition<br/>windowId, x, y"]

    D["Store Updates<br/>Find window by ID"]
    E["Update position<br/>in openWindows array"]
    F["Notify subscribers"]

    G["Component Re-renders<br/>Position Prop Changed"]
    H["Calculate Transform<br/>translate3d(x, y, 0)"]
    I["Apply to DOM<br/>Window Moves"]

    A --> B --> C --> D --> E --> F --> G --> H --> I
```

---

## Portfolio Application Data Flow

### State Management

```mermaid
graph TD
    A["Portfolio.tsx<br/>Component State"]

    A --> B["activeSection<br/>useState"]
    B --> B1["'portfolio-about'<br/>'portfolio-projects'<br/>'portfolio-skills'<br/>'portfolio-workexp'<br/>'portfolio-resume'"]

    A --> C["handleSectionChange<br/>Function"]
    C --> C1["Check Special Cases<br/>Resume Download?"]
    C1 --> C2["Trigger Download<br/>or Skip"]
    C2 --> C3["setActiveSection(id)"]
    C3 --> C4["State Updated"]

    C4 --> D["Re-render Triggered"]
    D --> E["renderSection()<br/>Called"]
    E --> F["Switch Case<br/>on activeSection"]
    F --> G["Return Component<br/>to Render"]
    G --> H["UI Updated<br/>New Section Visible"]
```

**Component Structure:**

```typescript
function Portfolio() {
  const [activeSection, setActiveSection] = useState('portfolio-about');

  const handleSectionChange = (id) => {
    // Special logic for resume
    if (id === 'portfolio-resume') {
      triggerDownload();
    }
    setActiveSection(id);
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'portfolio-about': return <AboutMe />;
      case 'portfolio-projects': return <Projects />;
      // ... other cases
    }
  };

  return (
    <div className="portfolio">
      <PortfolioNavbar onButtonClick={handleSectionChange} />
      <div className="section-wrapper">
        {renderSection()}
      </div>
    </div>
  );
}
```

---

## Props Drilling & Data Passing

### Navbar → Section Navigation

```mermaid
graph TD
    A["Portfolio.tsx"]
    A -->|Pass Props| B["PortfolioNavbar"]
    A -->|Pass Props| C["Section Component"]

    B -->|buttons: []| B1["ButtonDetailProps[]"]
    B1 --> B2["id: string"]
    B1 --> B3["name: string"]
    B1 --> B4["isActive: boolean"]
    B1 --> B5["onButtonClick: function"]

    B -->|onButtonClick| B5

    B5 -->|User Clicks| B6["onButtonClick(id)"]
    B6 -->|Calls| A
    A -->|handleSectionChange(id)| A1["Updates State<br/>& Renders"]

    C -->|portfolioData| C1["Props specific to<br/>section component"]
```

---

## Resume Download Data Flow

### Complete Download Process

```mermaid
graph TD
    A["User Clicks<br/>Resume Button"]
    B["PortfolioNavbar<br/>onButtonClick Handler"]
    C["handleSectionChange<br/>id='portfolio-resume'"]

    D["Check Special Logic:<br/>id === 'portfolio-resume'"]
    E["Create Anchor Element<br/>const link = createElement"]
    F["Set Attributes:<br/>href, download, target"]

    G["Append to DOM:<br/>document.body.appendChild"]
    H["Trigger Download:<br/>link.click()"]
    I["Remove from DOM:<br/>removeChild"]

    J["setActiveSection<br/>='portfolio-resume'"]
    K["Component Re-renders<br/>renderSection Called"]
    L["Return<br/>DownloadableResume"]

    A --> B --> C --> D --> E --> F --> G --> H --> I --> J --> K --> L

    H -.->|Browser Action| M["HTTP GET Request<br/>/portfolio-os/resume.pdf"]
    M -.->|Server Response| N["PDF Streamed<br/>to Browser"]
    N -.->|Browser Action| O["Download Dialog<br/>Save File"]

    style M fill:#fff3cd
    style N fill:#fff3cd
    style O fill:#fff3cd
```

---

## Section Component Data Flow

### AboutMe Component Example

```mermaid
graph TD
    A["Portfolio.tsx<br/>Calls renderSection"]
    B["activeSection ===<br/>'portfolio-about'?"]

    B -->|Yes| C["Return AboutMe<br/>Component"]

    C --> D["AboutMe Mounts"]
    D --> E["Import Constants<br/>ABOUT_ME_DETAILS"]
    E --> F["Map Over<br/>Data"]

    F --> G["Render JSX<br/>with Data"]
    G --> H["Display<br/>Personal Info"]

    style A fill:#e1f5
    style H fill:#e1f5
```

**Data Source Flow:**

```
src/constants/portfolioConstants.ts
  ↓
  ABOUT_ME_DETAILS
  ↓
  AboutMe.tsx (import)
  ↓
  Component Uses Data
  ↓
  Render UI
```

---

## Responsive Design Data Flow

### Mobile Detection & Adaptation

```mermaid
graph TD
    A["PortfolioNavbar Loads"]
    B["useMediaQuery<br/>480px Threshold"]
    C["Query Browser<br/>Window Width"]

    D{"Width<br/>> 450px?"}

    C --> D

    D -->|Desktop| E["isMobileView = false"]
    D -->|Mobile| F["isMobileView = true"]

    E --> G["shouldShowName =<br/>Always True"]
    F --> H["shouldShowName =<br/>isActive Only"]

    G --> I["Render Full<br/>Button Labels"]
    H --> J["Render Icon Only<br/>on Inactive"]

    I --> K["Desktop UI"]
    J --> L["Mobile UI"]

    M["Window Resize<br/>Event Fires"] --> B
```

**Code Implementation:**

```typescript
const isMobileView = useMediaQuery('(max-width: 450px)');
const shouldShowName = !isMobileView || item.isActive;
```

---

## Unidirectional Data Flow Summary

```mermaid
graph LR
    A["User<br/>Interaction"]
    B["Event<br/>Handler"]
    C["Store<br/>Action"]
    D["State<br/>Update"]
    E["Component<br/>Re-render"]
    F["DOM<br/>Update"]
    G["Visual<br/>Change"]

    A -->|Click, Drag| B
    B -->|Dispatch| C
    C -->|Mutation| D
    D -->|Notify| E
    E -->|Virtual DOM| F
    F -->|Paint| G
    G -->|User Sees| A
```

---

## Data Sources

| Data Type           | Source         | Access                | Example                      |
| ------------------- | -------------- | --------------------- | ---------------------------- |
| **Window State**    | Zustand Store  | `useWorkspaceState()` | Active windows, positions    |
| **UI State**        | Zustand Store  | `useSystemUIState()`  | Theme, brightness, startMenu |
| **Auth State**      | Zustand Store  | `useAuth()`           | Username, admin status       |
| **Portfolio Data**  | Constants File | `import { ... }`      | About, projects, skills      |
| **Component State** | React useState | `useState()`          | Active section               |
| **Dynamic State**   | Computed       | Function              | Filtered lists               |

---
