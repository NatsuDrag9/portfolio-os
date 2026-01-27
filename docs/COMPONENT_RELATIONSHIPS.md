# Component Relationships

Visual representation of component hierarchy, dependencies, and data flow between components.

---

## Overall Application Hierarchy

```mermaid
graph TD
    A["App.tsx<br/>Root Component"]

    A --> B["Workspace.tsx<br/>Desktop Environment"]

    B --> B1["Desktop Background"]
    B --> B2["Taskbar Component"]
    B --> B3["StartMenu Component"]
    B --> B4["WindowManager<br/>Maps activeWindows"]

    B4 --> B5["WindowContainer<br/>Drag/Resize Wrapper"]

    B5 --> C["App Component<br/>based on windowName"]

    C --> C1["Portfolio App"]
    C --> C2["File Explorer"]
    C --> C3["GitHub App"]
    C --> C4["Settings"]

    C1 --> D["Portfolio Component<br/>Main Container"]
```

---

## Portfolio Component Tree

```mermaid
graph TD
    A["Portfolio.tsx<br/>Container Component<br/>Manages activeSection"]

    A --> B["Sidebar Component<br/>Personal Info"]
    A --> C["PortfolioNavbar Component<br/>Navigation Buttons"]
    A --> D["Section Wrapper<br/>Conditional Render"]

    C --> C1["Button x N"]

    D --> E["ActiveSection Switch"]

    E -->|'portfolio-about'| F["AboutMe<br/>Presentational"]
    E -->|'portfolio-projects'| G["Projects<br/>Presentational"]
    E -->|'portfolio-skills'| H["Skills<br/>Presentational"]
    E -->|'portfolio-workexp'| I["WorkExperience<br/>Presentational"]
    E -->|'portfolio-resume'| J["DownloadableResume<br/>Presentational"]

    B --> B1["Profile Picture"]
    B --> B2["Name & Title"]
    B --> B3["Contact Info"]
    B --> B4["Social Links"]

    F --> F1["Education List"]
    F --> F2["Activities List"]

    G --> G1["Project Cards x N"]
    G1 --> G1a["Project Title"]
    G1 --> G1b["Tech Stack"]
    G1 --> G1c["Project Image"]

    H --> H1["Skill Categories"]
    H1 --> H1a["Skills List per Category"]

    I --> I1["Experience Cards x N"]
    I1 --> I1a["Company Info"]
    I1 --> I1b["Technologies"]

    J --> J1["Download Message"]
```

---

## Desktop Environment Structure

```mermaid
graph TD
    A["Workspace.tsx<br/>Desktop Wrapper"]

    A --> A1["useWorkspaceState<br/>Get activeWindows"]
    A --> A2["useSystemUIState<br/>Get UI state"]

    A --> B["Render Desktop<br/>Background"]
    A --> C["Render WindowManager<br/>Map activeWindows Array"]
    A --> D["Render Taskbar"]
    A --> E["Render StartMenu"]

    C --> C1["WindowContainer<br/>for each window"]
    C1 --> C1a["Window Frame<br/>Title Bar, Controls"]
    C1 --> C1b["App Content<br/>Based on windowName"]

    C1b --> C1b1["Portfolio App"]
    C1b --> C1b2["File Explorer"]
    C1b --> C1b3["GitHub App"]

    D --> D1["Taskbar Icons<br/>Show activeWindows"]
    D1 --> D1a["onClick: update z-index"]

    E --> E1["Start Menu Icon<br/>setStartMenuOpen"]
    E --> E2["App Icons Grid"]
    E2 --> E2a["onClick: addWindow"]
```

---

## Component Dependency Graph

```mermaid
graph LR
    A["App.tsx"]
    B["Workspace.tsx"]
    C["useWorkspaceState"]
    D["WindowManager"]
    E["WindowContainer"]
    F["Portfolio"]
    G["PortfolioNavbar"]

    A --> B
    B --> C
    B --> D
    D --> E
    E --> F
    F --> G
    G --> H["Custom Hooks<br/>useMediaQuery"]
```

---

## Data Flow Between Components

### Portfolio Navigation Flow

```mermaid
sequenceDiagram
    participant User
    participant PortfolioNavbar
    participant Portfolio
    participant SectionComponent

    User->>PortfolioNavbar: Click Navigation Button
    PortfolioNavbar->>PortfolioNavbar: Render Button<br/>isActive State
    PortfolioNavbar->>Portfolio: onButtonClick(id)
    Portfolio->>Portfolio: handleSectionChange(id)
    Portfolio->>Portfolio: setActiveSection(id)
    Portfolio->>SectionComponent: renderSection()<br/>Switch Case
    SectionComponent->>User: Display Section Content
```

### Store Integration

```mermaid
graph TD
    A["Component Uses<br/>useWindowStore Hook"]
    B["Subscribe to<br/>Specific State"]
    C["Get State Data<br/>& Actions"]
    D["Component Renders<br/>with Data"]
    E["User Interacts"]
    F["Dispatch Action<br/>to Store"]
    G["Store Updates"]
    H["Component<br/>Re-renders"]

    A --> B --> C --> D
    E --> F --> G --> H
    H --> D
```

---

## Component Props Flow

### Portfolio Props Passing

```mermaid
graph TD
    A["Portfolio.tsx"]

    A -->|buttons: ButtonDetailProps[]| B["PortfolioNavbar"]
    A -->|onButtonClick: function| B

    B -->|Button Props| B1["Individual Button"]
    B1 -->|onClick| B2["Trigger Parent Callback"]

    A -->|PROJECTS_DATA| C["Projects Component"]
    A -->|SKILLS.items| D["Skills Component"]
    A -->|ABOUT_ME_DETAILS| E["AboutMe Component"]
    A -->|WORK_EXPERIENCE_DETAILS| F["WorkExperience Component"]
```

---

## Reusable Components Location

```mermaid
graph TD
    A["src/components/"]

    A --> B["PortfolioNavbar"]
    A --> C["WindowContainer"]
    A --> D["Taskbar"]
    A --> E["StartMenu"]
    A --> F["WindowManager"]
    A --> G["Button"]
    A --> H["Icon"]

    B -->|Used in| B1["Portfolio App"]
    C -->|Used in| C1["WindowManager"]
    C1 -->|Wraps Each App| C1a["Portfolio<br/>FileExplorer<br/>GitHub<br/>Settings"]
    D -->|Used in| D1["Workspace"]
    E -->|Used in| E1["Workspace"]
    F -->|Used in| F1["Workspace"]
```

---

## Hierarchy Summary by Type

### Container Components

- `App.tsx` - Root
- `DefaultApp.tsx` - Desktop wrapper
- `Portfolio.tsx` - Portfolio main
- `PortfolioSection.tsx` - Conditional renderer (alternate)

### Presentational Components

- `PortfolioNavbar` - Navigation
- `Sidebar` - Info display
- `AboutMe` - About section
- `Projects` - Projects section
- `Skills` - Skills section
- `WorkExperience` - Experience section
- `DownloadableResume` - Resume section

### Shared/UI Components

- `Window` - Window frame
- `TaskBar` - Bottom taskbar
- `StartMenu` - App launcher
- `Button`, `Icon`, etc. - Basic UI

---

## Component Communication Patterns

### Direct Props (Parent → Child)

```
Portfolio.tsx
  ↓
  PortfolioNavbar (receives buttons, onButtonClick)
  ↓
  Button (receives id, name, isActive)
```

### Callbacks (Child → Parent)

```
Button.onClick()
  ↓
  PortfolioNavbar.onButtonClick(id)
  ↓
  Portfolio.handleSectionChange(id)
```

### Store (Global State)

```
useWindowStore Hook
  ↓
  Available in any component
  ↓
  Dispatch actions to update
```

### Context (if used)

```
ThemeContext
  ↓
  Wraps tree
  ↓
  useContext(ThemeContext)
```

---

## Lifecycle: From App Start to Portfolio Display

```mermaid
graph TD
    A["App Mounts"]
    B["Initialize Zustand Stores"]
    C["Render Workspace"]
    D["User Clicks Portfolio Icon"]
    E["dispatch addWindow"]
    F["Window Added to activeWindows"]
    G["Workspace Re-renders"]
    H["WindowManager Maps activeWindows"]
    I["Render WindowContainer"]
    J["Render Portfolio App"]
    K["Portfolio.tsx Mounts"]
    L["useState activeSection"]
    M["Render PortfolioNavbar"]
    N["Render AboutMe Section"]
    O["Portfolio Visible"]

    A --> B --> C --> D --> E --> F --> G --> H --> I --> J --> K --> L --> M --> N --> O
```

---
