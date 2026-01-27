# UI Flow

Visual representation of user interactions, screen navigation, and state transitions in Portfolio OS.

## Overview

Portfolio OS has three main navigation contexts:

1. **Application Startup** - Initialization and desktop boot
2. **Desktop Environment** - The window system (Taskbar, Start Menu, Windows)
3. **Portfolio Application** - The main app with multiple sections

---

## Application Startup & Initialization

### From App Launch to Desktop Ready

```mermaid
graph TD
    A["User Opens Browser<br/>or Visits URL"] --> B["Vite Development Server<br/>OR Static HTML File"]
    B --> C["Load index.html"]
    C --> D["Execute main.tsx"]
    D --> E["React Renders<br/>App.tsx"]

    E --> F["App Component Loads"]
    F --> G["Initialize Zustand Store<br/>useWindowStore<br/>useSettingsStore<br/>etc."]

    G --> H["Render Root Container<br/><div id='root'>"]
    H --> I["Render DefaultApp<br/>Main Desktop Wrapper"]

    I --> J["Initialize Desktop<br/>Components"]
    J --> K["Render Desktop Environment<br/>Background/Wallpaper"]
    K --> L["Render Taskbar<br/>Bottom of Screen"]
    L --> M["Render Start Menu<br/>Collapsed State"]
    M --> N["Render System Tray<br/>Clock, Settings Icon"]

    N --> O["Desktop Ready<br/>Waiting for User Input"]
    O --> P["User Can Interact<br/>with Desktop"]
```

**Code Entry Points:**

- `src/main.tsx` - React app entry
- `src/App.tsx` - Root component
- `src/screens/Workspace/Workspace.tsx` - Desktop environment
- `src/components/WindowManager/WindowManager.tsx` - Window management

---

### Store Initialization

```mermaid
graph TD
    A["App.tsx Mounts"]
    B["Zustand Store Loads<br/>Multiple Slices"]

    A --> B

    B --> C["WorkspaceState Store<br/>activeWindows: []<br/>addWindow()<br/>removeWindow()"]
    B --> D["SystemUIState Store<br/>currentTheme: 'light'<br/>startMenuOpen: false<br/>setTheme()"]
    B --> E["AuthState Store<br/>username<br/>isAdmin"]
    B --> F["BootStatus Store<br/>bootStatus<br/>allOperations"]

    C --> G["Store Ready<br/>All Slices Available"]
    D --> G
    E --> G
    F --> G

    G --> H["Components Can Subscribe<br/>to Store Updates"]
```

---

## Desktop Environment Flow

### Desktop Interaction States

```mermaid
graph TD
    A["Desktop Loaded<br/>Start Menu Closed"]

    B["User Action"]
    A --> B

    B --> C{"What Did User Do?"}

    C -->|Click Start Menu Icon| D["Toggle Start Menu<br/>setStartMenuOpen(true)"]
    C -->|Click Start Menu Item| E["Open Application"]
    C -->|Click Taskbar Icon| F["Switch to App Window"]
    C -->|Click on Empty Area| G["Nothing Happens"]

    D --> H["Start Menu Opens<br/>Show Apps Grid"]
    H --> I["User Selects App<br/>or Closes Menu"]
    I --> A

    E --> J["Dispatch addWindow<br/>with appMetadata"]
    J --> K["Add to Store<br/>activeWindows Array"]
    K --> L["WindowManager Renders<br/>Window Component"]
    L --> M["Window Appears<br/>on Desktop"]
    M --> A

    F --> N["Update z-index<br/>via store"]
    N --> M

    G --> A
```

### Start Menu Opening/Closing

```mermaid
sequenceDiagram
    participant Desktop
    participant StartMenu
    participant Store
    participant TaskBar

    Desktop->>TaskBar: User Clicks Start Icon
    TaskBar->>Store: toggleStartMenu()
    Store->>Store: startMenuOpen = !startMenuOpen
    Store-->>TaskBar: Update State
    TaskBar-->>Desktop: Start Menu Toggle

    alt startMenuOpen === true
        Desktop->>StartMenu: Render Open State
        StartMenu-->>Desktop: Show Apps Grid
    else startMenuOpen === false
        Desktop->>StartMenu: Render Closed State
        StartMenu-->>Desktop: Hide Apps Grid
    end
```

### Opening an Application (Portfolio)

```mermaid
graph TD
    A["User Clicks 'Portfolio'<br/>in Start Menu"]
    B["Start Menu Handler<br/>Triggered"]
    A --> B

    B --> C["Dispatch addWindow<br/>appId: 'portfolio-default'<br/>appMetadata"]
    C --> D["Zustand Store<br/>useWorkspaceState Updates"]

    D --> E["Add to activeWindows:<br/>windowId: 'portfolio-1'<br/>title: 'Portfolio'<br/>windowName: 'Portfolio'<br/>position: x:100, y:80<br/>size: w:700, h:400"]

    E --> F["React Re-renders<br/>Workspace"]
    F --> G["WindowManager Maps<br/>activeWindows"]

    G --> H["Render WindowContainer<br/>Drag/Resize Handlers"]
    H --> I["Render App Content<br/>Based on windowName"]
    I --> J["Portfolio App<br/>Renders Inside WindowContainer"]

    J --> K["Portfolio Shows<br/>About Section"]
    K --> L["Window Visible<br/>on Desktop"]
```

---

## Portfolio Application Flow

### Section Navigation

```mermaid
graph TD
    A["Portfolio Loads<br/>activeSection: 'portfolio-about'"]
    B["PortfolioNavbar Displays<br/>Navigation Buttons"]
    A --> B

    B --> C{"User Clicks Button?"}

    C -->|About| D["handleSectionChange<br/>id: 'portfolio-about'"]
    C -->|Projects| E["handleSectionChange<br/>id: 'portfolio-projects'"]
    C -->|Skills| F["handleSectionChange<br/>id: 'portfolio-skills'"]
    C -->|WorkExp| G["handleSectionChange<br/>id: 'portfolio-workexp'"]
    C -->|Resume| H["handleSectionChange<br/>id: 'portfolio-resume'"]

    D --> I["Check Special Logic<br/>Resume download?"]
    E --> I
    F --> I
    G --> I
    H --> I

    I -->|Resume Button| J["Trigger Download<br/>Create Anchor Element"]
    I -->|Other Buttons| K["Skip Download Logic"]

    J --> L["setActiveSection<br/>activeSection = id"]
    K --> L

    L --> M["Component Re-renders<br/>renderSection Called"]
    M --> N["Switch Case<br/>on activeSection"]

    N --> O["Return Correct<br/>Component"]
    O --> P["Component Renders<br/>in Main Area"]
    P --> Q["Page Transition<br/>Complete"]
    Q --> C
```

### Resume Download Flow (Complete)

```mermaid
graph TD
    A["User Clicks Resume<br/>Button in PortfolioNavbar"]
    B["onButtonClick Fires<br/>Calls handleSectionChange"]
    A --> B

    B --> C["handleSectionChange<br/>receives id='portfolio-resume'"]
    C --> D{"Check ID:<br/>id === 'portfolio-resume'?"}

    D -->|YES - Resume Button| E["Special Logic:<br/>Download Resume"]
    D -->|NO - Other Button| K["Skip to Normal Flow"]

    E --> F["Create Temporary<br/>Anchor &lt;a&gt; Element"]
    F --> G["Set Element href<br/>to '/portfolio-os/<br/>Rohit_Resume_<br/>Frontend_2.pdf'"]

    G --> H["Set download<br/>Attribute to<br/>Custom Filename"]
    H --> I["Append to<br/>document.body<br/>ADD to DOM"]

    I --> J["Trigger .click()<br/>Browser Download"]
    J --> J1["Browser Request<br/>GET /portfolio-os/resume.pdf"]
    J1 --> J2["Server Responds<br/>with PDF file"]
    J2 --> J3["Browser Shows<br/>Save Dialog"]
    J3 --> J4["User Saves<br/>to Computer"]

    J4 --> K["Remove Element<br/>from DOM"]
    K --> L["Call setActiveSection<br/>activeSection =<br/>'portfolio-resume'"]

    L --> M["React Re-renders<br/>Portfolio Component"]
    M --> N["renderSection()<br/>Called"]
    N --> O["Return<br/>DownloadableResume<br/>Component"]
    O --> P["Render Message:<br/>'Your resume is<br/>being downloaded...'"]
    P --> Q["Portfolio Shows<br/>Resume Section"]
```

---

## Window Management Flow

### Window Interaction Lifecycle

```mermaid
graph TD
    A["Window Created<br/>Added to Store"]
    B["User Interacts<br/>with Window"]

    A --> B

    B --> C{"Interaction Type?"}

    C -->|Mouse Drag| D["Drag Handler Active<br/>Update Position<br/>in Store"]
    C -->|Mouse Resize| E["Resize Handler Active<br/>Update Size<br/>in Store"]
    C -->|Click Window| F["setActiveWindow<br/>Update z-index"]
    C -->|Click Close X| G["Dispatch<br/>closeWindow()"]
    C -->|Click Inside| H["Focus Window<br/>Set activeWindowId"]

    D --> I["Store Updates"]
    E --> I
    F --> I
    G --> I
    H --> I

    I --> J["Component Re-renders<br/>with New Props"]
    J --> K["Window Style Updated<br/>transform: translate<br/>width, height"]

    K --> L["Visual Update<br/>on Screen"]
    L --> B

    G --> M["Remove from<br/>openWindows Array"]
    M --> N["Unmount Window<br/>Component"]
    N --> O["Window Removed<br/>from UI"]
```

---

## Component Rendering Pipeline

### Portfolio Component Lifecycle

```mermaid
sequenceDiagram
    participant Window as Window Container
    participant Portfolio as Portfolio.tsx
    participant Navbar as PortfolioNavbar
    participant Section as Section Components

    Window->>Portfolio: App Opened<br/>componentDidMount
    Portfolio->>Portfolio: Initialize State<br/>activeSection='about'

    Portfolio->>Navbar: Render Navbar<br/>Pass buttons array
    Navbar-->>Portfolio: Ready to Handle Clicks

    Portfolio->>Portfolio: Call renderSection()<br/>Switch on activeSection

    alt activeSection = 'about'
        Portfolio->>Section: Return AboutMe
        Section-->>Portfolio: JSX
    else activeSection = 'projects'
        Portfolio->>Section: Return Projects
        Section-->>Portfolio: JSX
    else activeSection = 'resume'
        Portfolio->>Section: Return DownloadableResume
        Section-->>Portfolio: JSX
    end

    Portfolio-->>Window: Complete JSX<br/>Render to DOM

    Window->>Window: Display Portfolio UI

    Navbar->>Navbar: User Clicks Button
    Navbar->>Portfolio: Call onButtonClick(id)
    Portfolio->>Portfolio: handleSectionChange(id)
    Portfolio->>Portfolio: setActiveSection(id)
    Portfolio->>Portfolio: State Update
    Portfolio->>Portfolio: Re-render Called
    Portfolio->>Navbar: Re-render Navbar<br/>Update Active Button
    Portfolio->>Portfolio: Call renderSection()<br/>NEW activeSection
    Portfolio-->>Window: New Section Component JSX
```

---

## Responsive UI Flow

### Mobile vs Desktop Adaptation

```mermaid
graph TD
    A["App Loads"]
    B["useMediaQuery<br/>480px threshold"]

    A --> B

    B --> C{"Screen Width<br/>> 450px?"}

    C -->|Desktop| D["isMobileView = false"]
    C -->|Mobile| E["isMobileView = true"]

    D --> F["Render Full Layout:<br/>Sidebar Visible<br/>All Nav Buttons<br/>Full Content"]
    E --> G["Render Compact Layout:<br/>Collapsed Sidebar<br/>Icon Only Buttons<br/>Full Width Content"]

    F --> H["Desktop UI<br/>Ready"]
    G --> I["Mobile UI<br/>Ready"]

    H --> J["Window Resize?<br/>Media Query Re-evaluates"]
    I --> J

    J -->|Width Changes| K["Update isMobileView"]
    K --> L["Re-render with<br/>New Layout"]
    L --> J
```

**PortfolioNavbar responsive logic:**

```typescript
const isMobileView = useMediaQuery('(max-width: 450px)');
const shouldShowName = !isMobileView || item.isActive;
```

---

## Error & Edge Cases

### Resume File Not Found

```mermaid
graph TD
    A["Resume Button Clicked"]
    B["Create Anchor +<br/>Set href"]
    C["Trigger Click"]

    A --> B --> C

    C --> D["Browser Request<br/>GET /portfolio-os/resume.pdf"]
    D --> E{"Server Response?"}

    E -->|200 OK| F["PDF File Sent<br/>Download Starts"]
    E -->|404 Not Found| G["HTTP 404 Error<br/>File Not Found"]

    F --> H["Download Success<br/>File Saved"]
    G --> I["Browser Shows<br/>404 Error Page<br/>User Sees Error"]

    H --> J["Resume Section<br/>Shows Message"]
    I --> K["Download Fails<br/>Error Visible"]
```

---

## Complete User Journey Example

### From App Load to Portfolio Navigation

```
1. User Opens Browser
   ↓
2. App.tsx Mounts
   ↓
3. Zustand Store Initializes
   ↓
4. Desktop Environment Renders
   ├── Background
   ├── Taskbar
   ├── Start Menu (closed)
   └── System Tray
   ↓
5. User Clicks Start Menu Icon
   ↓
6. Start Menu Opens
   ├── Shows App Icons
   └── Portfolio Icon Visible
   ↓
7. User Clicks "Portfolio" Icon
   ↓
8. handleOpenWindow('portfolio-default')
   ↓
9. Window Added to Store
   ↓
10. Window Component Renders
    └── Portfolio App Inside
    ↓
11. Portfolio Loads with About Section
    ├── Sidebar Shows
    ├── PortfolioNavbar Shows
    └── About Section Displays
    ↓
12. User Clicks "Projects" Button
    ↓
13. handleSectionChange('portfolio-projects')
    ↓
14. setActiveSection Updated
    ↓
15. Portfolio Re-renders
    ↓
16. Projects Section Displays
```

---

## Quick Reference: Navigation Paths

| Flow                | Path                                                             |
| ------------------- | ---------------------------------------------------------------- |
| **App Start**       | Browser → App.tsx → Store Init → Desktop Ready                   |
| **Open Portfolio**  | Start Menu → Click Portfolio → Window Opens → About Section      |
| **Switch Sections** | Click Nav Button → handleSectionChange → Section Renders         |
| **Download Resume** | Click Resume → Download Logic → Download Starts → Resume Section |
| **Close Window**    | Click Close X → closeWindow() → Window Removed                   |
| **Switch Apps**     | Click Taskbar Icon → setActiveWindow → App Focused               |

---
