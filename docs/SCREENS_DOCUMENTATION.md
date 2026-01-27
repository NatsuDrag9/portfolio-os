# Screens & Navigation Documentation

Complete guide to all screens in Portfolio OS, their navigation flows, state management, and connections.

---

## Screen Overview

Portfolio OS has **2 main screens**:

| Screen          | Component                             | Purpose               | Entry Condition       |
| --------------- | ------------------------------------- | --------------------- | --------------------- |
| **Boot Screen** | `src/screens/Boot/Boot.tsx`           | System startup, login | `bootStatus !== 'ON'` |
| **Workspace**   | `src/screens/Workspace/Workspace.tsx` | Desktop environment   | `bootStatus === 'ON'` |

Within Workspace, multiple **application windows** can be open simultaneously.

---

## Boot Status States

The application uses 6 boot states to manage the startup/shutdown lifecycle:

```typescript
type BootStatusType =
  | 'ON' // System fully operational
  | 'DISPLAY_SHUTDOWN_SCREEN' // Showing shutdown animation
  | 'DISPLAY_BOOT_SCREEN' // Initial boot sequence
  | 'DISPLAY_LOGIN_SCREEN' // Login form visible
  | 'DISPLAY_POST_LOGIN_SCREEN' // Post-login boot sequence
  | 'OFF'; // System powered down
```

### Boot Status Diagram

```
┌──────────────────────┐
│        OFF           │  (System powered down)
└──────────┬───────────┘
           │
           ▼
┌──────────────────────────────┐
│ DISPLAY_BOOT_SCREEN          │  Shows: Initial system operations
│                              │  Duration: ~2-3 seconds
│ Operations:                  │
│ - Initializing Virtual...    │
│ - Loading System UI Kernel.. │
│ - Applying Default Config... │
│ - Preparing Application...   │
│ - System Ready. Launching... │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────────────┐
│ DISPLAY_LOGIN_SCREEN         │
│                              │
│ Shows: Login Form            │
│ User enters username         │
│ User clicks Login button     │
└──────────┬───────────────────┘
           │
           │ handleLogin(username)
           │
           ▼
┌──────────────────────────────┐
│DISPLAY_POST_LOGIN_SCREEN     │  Shows: Post-login operations with username
│                              │  Duration: ~2-3 seconds
│ Operations:                  │
│ - Authentication User: ...   │
│ - Loading Profile and Perm.. │
│ - Applying Default User...   │
│ - Welcome, [user]. Launching │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────┐
│        ON            │  Desktop fully operational
│    (Workspace)       │  User can interact
└──────────┬───────────┘
           │
           │ User clicks Power Off
           │
           ▼
┌──────────────────────────────┐
│DISPLAY_SHUTDOWN_SCREEN       │  Shows: Shutdown operations
│                              │  Duration: ~2-3 seconds
│ Operations:                  │
│ - Closing all active...      │
│ - Disconnecting User...      │
│ - Shutdown complete          │
└──────────┬───────────────────┘
           │
           ▼
┌──────────────────────┐
│        OFF           │
│   (Back to login)    │
└──────────────────────┘
```

---

## Boot Operations

Each boot state displays sequential operations from `src/constants/storeConstants.ts`:

### DISPLAY_BOOT_SCREEN Operations

```typescript
('Initializing Virtual Hardware...',
  'Loading System UI Kernel..',
  'Applying Default Configuration...',
  'Preparing Application Registry...',
  'System Ready. Launching Login Screen...');
```

**Duration:** 2-3 seconds
**Transitions to:** DISPLAY_LOGIN_SCREEN

### DISPLAY_LOGIN_SCREEN

No operations displayed (shows login form instead).
User enters username and clicks Login button.

**Transitions to:** DISPLAY_BOOT_SCREEN (when Login clicked)

### DISPLAY_POST_LOGIN_SCREEN Operations

```typescript
// Dynamically includes username
(`Authentication User: [username]`,
  'Loading Profile and Permissions...',
  'Applying Default User Theme...',
  `Welcome, [username]. Launching Desktop Environment...`);
```

**Duration:** 2-3 seconds
**Transitions to:** ON

### DISPLAY_SHUTDOWN_SCREEN Operations

```typescript
('Closing all active windows...',
  'Disconnecting User Profile...',
  'Shutdown complete');
```

**Duration:** 2-3 seconds
**Transitions to:** OFF

### ON & OFF

Empty operations (no loading screen).

---

## Navigation Flow

### Screen Selection Logic

```typescript
// src/App.tsx
function App() {
  const { bootStatus } = useBootStatus();

  // Only show Workspace if system is fully operational
  if (bootStatus === 'ON') {
    return <Workspace />;
  }

  // Show Boot screen for all other states
  return <BootScreen />;
}
```

---

## Screen 1: Boot Screen

**File:** `src/screens/Boot/Boot.tsx`

Handles system startup and user authentication.

### State Dependencies

```typescript
// useBootStatus - Boot sequence control
const { bootStatus, allOperations, operationIndex } = useBootStatus();

// useAuth - User authentication
const { username, updateAuthState } = useAuth();

// useSystemUIState - User preferences
const { setDisplayLoader } = useSystemUIState();
```

### Boot Screen Flow

```
┌─ bootStatus = OFF ──────────────────────┐
│  (Initial system power on)              │
└────────┬────────────────────────────────┘
         │
         ▼
   ┌─────────────────────┐
   │ DISPLAY_BOOT_SCREEN │
   │ (Loading animation) │
   └────┬────────────────┘
        │ [Auto-transition after 2-3 seconds]
        │
        ▼
   ┌──────────────────────┐
   │DISPLAY_LOGIN_SCREEN  │
   │ LoginForm visible    │
   │ User fills form      │
   └────┬─────────────────┘
        │ handleLogin(username)
        │
        ├─ updateAuthState(username)
        │  └─ Sets: username, isAdmin, isReadOnlyMode
        │
        ├─ updateBootStatus('DISPLAY_POST_LOGIN_SCREEN', username)
        │  └─ Shows post-login operations with username
        │
        └─ [After 2-3 seconds, auto-transition]
           │
           ▼
           updateBootStatus('ON')
           └─ bootStatus becomes 'ON'
           └─ App detects this and renders <Workspace />
```

### Login Implementation

```typescript
function BootScreen() {
  const { bootStatus } = useBootStatus();
  const { updateAuthState } = useAuth();
  const { updateBootStatus } = useBootStatus();

  const handleLogin = (username: string) => {
    // Step 1: Update auth state
    updateAuthState(username);

    // Step 2: Transition to post-login screen
    updateBootStatus('DISPLAY_POST_LOGIN_SCREEN', username);

    // Note: Further transitions happen automatically
    // after each boot stage completes
  };

  // Show appropriate screen based on bootStatus
  switch (bootStatus) {
    case 'OFF':
    case 'DISPLAY_BOOT_SCREEN':
      return <BootAnimation />;
    case 'DISPLAY_LOGIN_SCREEN':
      return <LoginForm onSubmit={handleLogin} />;
    case 'DISPLAY_POST_LOGIN_SCREEN':
      return <BootAnimation />;
    default:
      return null;
  }
}
```

---

## Screen 2: Workspace

**File:** `src/screens/Workspace/Workspace.tsx`

The main desktop environment where users work with applications.

### Architecture

```typescript
function Workspace() {
  const { username } = useAuth();
  const {
    isNightLightActive,
    brightnessLevel,
    displayLoader,
    setDisplayLoader
  } = useSystemUIState();

  // Auto-hide loader after 3 seconds
  useEffect(() => {
    if (displayLoader.isLoading) {
      const timer = setTimeout(() => {
        setDisplayLoader({ isLoading: false, triggeredFrom: 'undefined' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [displayLoader.isLoading]);

  return (
    <div className="workspace">
      {/* Welcome message */}
      <h4>Hello, {username}</h4>

      {/* Main content area */}
      {renderWithLoader()}
        ├── <Desktop />              // Background
        ├── <WindowManager />        // Renders windows
        └── <StartMenu />            // App launcher

      {/* Taskbar at bottom */}
      <Taskbar />

      {/* Overlay effects */}
      {isNightLightActive && <NightLightOverlay />}
      {brightnessLevel < 100 && <BrightnessOverlay opacity={...} />}
    </div>
  );
}
```

### State Dependencies

```typescript
useAuth: -username; // User greeting

useBootStatus: -bootStatus; // Detect if still operational

useSystemUIState: -startMenuOpen - // Show/hide Start Menu
  isNightLightActive - // Apply overlay
  brightnessLevel - // Apply overlay
  displayLoader - // Show loading animation
  setDisplayLoader(); // Hide loader

useWorkspaceState: -activeWindows - // Windows to render
  addWindow() - // Open new window
  removeWindow() - // Close window
  updateWindowPosition() - // Drag
  updateWindowSize() - // Resize
  setWindowIsMaximized(); // Min/Max/Normal
```

### Sub-Components

#### Desktop

Shows wallpaper and desktop background from `useWorkspaceState.activeBackground`.

#### WindowManager

Maps each `activeWindow` to a rendered component:

```typescript
function WindowManager() {
  const { activeWindows } = useWorkspaceState();

  const renderWindowContent = (windowName: string, windowId: string) => {
    switch (windowName) {
      case 'Portfolio':
        return <Portfolio key={windowId} />;
      case 'PortfolioSection': {
        const appId = windowId.substring(0, windowId.lastIndexOf('-'));
        return <PortfolioSection key={windowId} appId={appId} />;
      }
      case 'FileExplorer':
        return <FileExplorer key={windowId} />;
      case 'Github':
        return <Github key={windowId} />;
      case 'Settings':
        return <Settings key={windowId} />;
      case 'VSCode':
        return <VSCode key={windowId} />;
      case 'Terminal':
        return <Terminal key={windowId} />;
      case 'CommandPrompt':
        return <CommandPrompt key={windowId} />;
      case 'Notepad':
        return <Notepad key={windowId} />;
      default:
        return null;
    }
  };

  return (
    <>
      {activeWindows
        .filter(window => !!window.id && !!window.windowName)
        .map(window => (
          <WindowContainer key={window.id} windowId={window.id}>
            {renderWindowContent(window.windowName, window.id)}
          </WindowContainer>
        ))}
    </>
  );
}
```

#### StartMenu

Shows app grid/list. Triggers `useWorkspaceState.addWindow()` when app is clicked:

```typescript
const handleAppClick = (appMetadata: AppMetadata) => {
  const { addWindow } = useWorkspaceState();
  const { setStartMenuOpen } = useSystemUIState();

  addWindow(appMetadata.id, appMetadata);
  setStartMenuOpen(false); // Close menu after opening app
};
```

#### Taskbar

Shows pinned apps and system info. Allows window switching.

#### WindowContainer

Wraps each app with title bar, controls (min/max/close), and drag/resize handlers:

```typescript
function WindowContainer({ windowId, children }) {
  const {
    activeWindows,
    updateWindowPosition,
    updateWindowSize,
    setWindowIsMaximized,
    requestCloseWindow
  } = useWorkspaceState();

  return (
    <Rnd
      onDragStop={(_, d) => updateWindowPosition(windowId, d.x, d.y)}
      onResizeStop={(_, __, ref, ___, pos) => {
        updateWindowSize(windowId, ref.offsetWidth, ref.offsetHeight);
        updateWindowPosition(windowId, pos.x, pos.y);
      }}
    >
      {/* Title bar with controls */}
      {/* App content */}
    </Rnd>
  );
}
```

---

## Complete Navigation: Login to Desktop to App

```
STEP 1: SYSTEM STARTS
  └─ bootStatus = 'OFF'
  └─ App renders <BootScreen />
  └─ BootAnimation plays

STEP 2: LOGIN SCREEN SHOWS
  └─ After boot animation completes
  └─ bootStatus = 'DISPLAY_LOGIN_SCREEN'
  └─ LoginForm becomes visible
  └─ User enters username

STEP 3: USER LOGS IN
  └─ BootScreen: handleLogin('rohit')
  ├─ updateAuthState('rohit')
  │  └─ Sets: username='rohit', isAdmin=false
  └─ updateBootStatus('DISPLAY_POST_LOGIN_SCREEN', 'rohit')
     └─ Shows: "Welcome, rohit. Launching Desktop..."

STEP 4: POST-LOGIN BOOT
  └─ BootAnimation plays
  └─ Shows operations with username
  └─ [Auto-transition after 2-3 seconds]

STEP 5: SYSTEM READY
  └─ updateBootStatus('ON')
  └─ bootStatus = 'ON'
  └─ App detects: bootStatus === 'ON'
  └─ App renders <Workspace /> instead of <BootScreen />

STEP 6: WORKSPACE LOADS
  └─ <Desktop /> - Shows wallpaper
  └─ <WindowManager /> - Empty (no windows yet)
  └─ <Taskbar /> - Shows pinned apps
  └─ <StartMenu /> - Hidden by default
  └─ User greeting: "Hello, rohit"

STEP 7: USER OPENS START MENU
  └─ Taskbar: onClick on Start icon
  └─ setStartMenuOpen(true)
  └─ StartMenu becomes visible

STEP 8: USER CLICKS PORTFOLIO APP
  └─ StartMenu: handleAppClick(portfolioMetadata)
  ├─ addWindow('portfolio-default', metadata)
  │  └─ Creates: {
  │      id: 'portfolio-default-1',
  │      windowName: 'Portfolio',
  │      position: { x: 100, y: 80 },
  │      size: { width: 700, height: 400 },
  │      zIndex: 1
  │    }
  └─ setStartMenuOpen(false)

STEP 9: WINDOW RENDERS
  └─ WindowManager detects new window in activeWindows
  └─ Renders: renderWindowContent('Portfolio', 'portfolio-default-1')
  └─ Returns: <Portfolio />
  └─ Wraps in: <WindowContainer windowId="portfolio-default-1">
  └─ User sees draggable window on desktop
```

---

## Shutdown/Logout Flow

```
STEP 1: USER CLICKS POWER OFF
  └─ Taskbar or Workspace: handleShutdown()

STEP 2: SHUTDOWN SEQUENCE STARTS
  └─ updateBootStatus('DISPLAY_SHUTDOWN_SCREEN')
  └─ Shows: "Closing all active windows..."
  └─ Displays shutdown operations
  └─ [Auto-transition after 2-3 seconds]

STEP 3: SYSTEM OFF
  └─ updateBootStatus('OFF')
  └─ updateAuthState(null)
  │  └─ Clears: username, isAdmin
  └─ bootStatus !== 'ON'
  └─ App detects this change
  └─ App renders <BootScreen /> instead of <Workspace />

STEP 4: BACK TO BOOT
  └─ DISPLAY_BOOT_SCREEN plays
  └─ Then DISPLAY_LOGIN_SCREEN appears
  └─ User can log in again
```

---

## Loader/Transition Screen

The Workspace can show a loading animation during settings changes:

```typescript
// In SettingsApp or any app:
const { setDisplayLoader } = useSystemUIState();

const handleApplySettings = () => {
  // Show loader
  setDisplayLoader({
    isLoading: true,
    triggeredFrom: 'settings',
  });

  // Apply changes...
  setTheme('dark');

  // Auto-hides after 3 seconds via Workspace useEffect
};
```

The Workspace automatically hides the loader after 3 seconds:

```typescript
useEffect(() => {
  if (displayLoader.isLoading) {
    const timer = setTimeout(() => {
      setDisplayLoader({ isLoading: false, triggeredFrom: 'undefined' });
    }, 3000);
    return () => clearTimeout(timer);
  }
}, [displayLoader.isLoading]);
```

---

## Window Management

Once in Workspace, users can:

1. **Open windows** - Click app in Start Menu → `addWindow()`
2. **Drag windows** - Click title bar → `updateWindowPosition()`
3. **Resize windows** - Click edge/corner → `updateWindowSize()`
4. **Minimize** - Click button → `setWindowIsMaximized('minimized')`
5. **Maximize** - Click button → `setWindowIsMaximized('maximized')`
6. **Restore** - Click button → `setWindowIsMaximized('normal')`
7. **Close** - Click X → `requestCloseWindow()` (triggers fade animation then `removeWindow()`)
8. **Switch focus** - Click window → Updates z-index

---

## Application Windows Available

| App            | Window Name                       | Component                             | Type               |
| -------------- | --------------------------------- | ------------------------------------- | ------------------ |
| Portfolio      | 'Portfolio' or 'PortfolioSection' | `src/apps/default/Portfolio/`         | Portfolio showcase |
| File Explorer  | 'FileExplorer'                    | `src/apps/default/FileExplorer/`      | File browser       |
| GitHub         | 'Github'                          | `src/apps/default/Github/`            | Repository browser |
| Settings       | 'Settings'                        | `src/apps/recommended/Settings/`      | System config      |
| VSCode         | 'VSCode'                          | `src/apps/recommended/VSCode/`        | Code editor        |
| Terminal       | 'Terminal'                        | `src/apps/recommended/Terminal/`      | Terminal           |
| Command Prompt | 'CommandPrompt'                   | `src/apps/recommended/CommandPrompt/` | Command line       |
| Notepad        | 'Notepad'                         | `src/apps/recommended/Notepad/`       | Text editor        |

---
