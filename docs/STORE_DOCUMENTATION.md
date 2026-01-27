# Zustand Store Documentation

Comprehensive reference for all global state stores in Portfolio OS.

---

## Overview

The application uses **4 specialized Zustand stores** for clear separation of concerns:

| Store                 | Purpose                           | Used By                             |
| --------------------- | --------------------------------- | ----------------------------------- |
| **useWorkspaceState** | Window management, desktop layout | WindowManager, Workspace, StartMenu |
| **useSystemUIState**  | Theme, UI preferences, settings   | Workspace, Taskbar, SettingsApp     |
| **useAuth**           | User authentication, permissions  | App, Workspace                      |
| **useBootStatus**     | Boot sequence, startup operations | App, Workspace                      |

---

## useWorkspaceState - Window Management

**File:** `src/store/store.ts`

Manages all window instances, their properties, and desktop layout.

### State Properties

```typescript
interface WorkspaceState {
  // Active windows array
  activeWindows: WindowData[];

  // Auto-incrementing instance counter per app
  // Maps appId -> highest instance number
  windowInstanceCounters: Record<string, number>;

  // Apps pinned to taskbar
  taskbarPinnedAppIds: string[];

  // Current desktop wallpaper/background
  activeBackground: string;
}

interface WindowData {
  id: string; // e.g., 'portfolio-1'
  title: string; // Window title shown in titlebar
  windowName: string; // App identifier (maps to WindowManager cases)
  position: { x: number; y: number }; // Top-left corner position
  size: { width: number; height: number }; // Window dimensions
  zIndex: number; // Stacking order
  isMaximized: 'normal' | 'maximized' | 'minimized';
  previousDisplayState: WindowDisplayType; // State before minimize
  customTheme?: CustomTheme; // Optional theme override
  snapPosition?: SnapPositionType; // Snap layout position
  isClosing?: boolean; // Animation flag
}
```

### State Actions

```typescript
// Open new window
addWindow(appId: string, appMetadata: AppMetadata): void
// Example:
const { addWindow } = useWorkspaceState();
addWindow('portfolio-default', {
  id: 'portfolio-default',
  appName: 'Portfolio',
  windowName: 'Portfolio'
});

// Close window with animation
removeWindow(windowId: string): void
// Hard remove without animation

// Request close with fade-out animation
requestCloseWindow(windowId: string): void
// Marks as isClosing=true, then removes after timeout

// Update window position (drag, snap, etc)
updateWindowPosition(windowId: string, x: number, y: number): void

// Update window size (resize)
updateWindowSize(windowId: string, width: number, height: number): void

// Toggle between normal/maximized/minimized
setWindowIsMaximized(windowId: string, isMaximized: WindowDisplayType): void
// When minimizing, saves previousDisplayState for restore

// Update window z-index (focus/bring to front)
updateWindowZIndex(windowId: string, zIndex: number): void

// Update window title
setWindowTitle(windowId: string, title: string): void

// Apply custom theme to window
setWindowCustomTheme(windowId: string, customTheme?: CustomTheme): void

// Update snap position (snap layouts)
updateWindowSnapPosition(windowId: string, snapPosition?: SnapPositionType): void

// Change desktop background
setActiveBackground(image: string): void

// Manage taskbar pins
setTaskbarPinnedAppIds(idArray: string[]): void
togglePin(appId: string): void

// Reset all workspace state
reset(): void
```

### Usage Examples

```typescript
// Opening a window
function StartMenu() {
  const { addWindow } = useWorkspaceState();

  const handleAppClick = (appMetadata: AppMetadata) => {
    addWindow(appMetadata.id, appMetadata);
  };

  return (
    <button onClick={() => handleAppClick(portfolioMetadata)}>
      Portfolio
    </button>
  );
}

// Dragging a window
function WindowContainer({ windowId }) {
  const { updateWindowPosition } = useWorkspaceState();

  const handleDragStop = (event, data) => {
    updateWindowPosition(windowId, data.x, data.y);
  };

  return <Rnd onDragStop={handleDragStop}>{/* ... */}</Rnd>;
}

// Checking active windows
function Taskbar() {
  const activeWindows = useWorkspaceState(state => state.activeWindows);

  return (
    <div>
      {activeWindows.map(w => (
        <TaskbarIcon key={w.id} window={w} />
      ))}
    </div>
  );
}
```

---

## useSystemUIState - UI & Theme Settings

**File:** `src/store/store.ts`

Manages user preferences, theme, and UI state.

### State Properties

```typescript
interface SystemUIState {
  // Desktop layout
  taskbarAlignment: 'bottom' | 'top' | 'left' | 'right';
  startMenuOpen: boolean;
  startMenuLayout: 'grid' | 'list';
  isSearchVisible: boolean;
  searchValue: string;

  // Theme & appearance
  currentTheme: 'light' | 'dark';
  brightnessLevel: number; // 0-100
  isNightLightActive: boolean;

  // Quick actions (shortcuts in system tray)
  activeQuickActions: QuickActionsType[]; // e.g., ['night-light', 'wifi']

  // System settings
  showRecommendedApps: boolean;
  showMoreIcons: boolean;
  volumeLevel: number; // 0-100

  // Date & time
  timeFormat: '12h' | '24h';
  dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
  timezone: string;
  autoSyncDateTime: boolean;

  // Loader display
  displayLoader: {
    isLoading: boolean;
    triggeredFrom: string;
  };
}
```

### State Actions

```typescript
// Start menu
setStartMenuOpen(isOpen: boolean): void
updateStartMenuLayout(layout: 'grid' | 'list'): void

// Theme
setTheme(theme: 'light' | 'dark'): void
setBrightnessLevel(value: 0-100): void
setNightLight(active: boolean): void
toggleQuickAction(action: QuickActionsType): void

// Search
setIsSearchVisible(isVisible: boolean): void
setSearchValue(value: string): void

// Taskbar
updateTaskbarAlignment(alignment: TaskbarAlignmentType): void

// App settings
setShowRecommendedApps(show: boolean): void
setShowMoreIcons(show: boolean): void
setVolumeLevel(value: 0-100): void

// Date & time
setTimeFormat(format: '12h' | '24h'): void
setDateFormat(format: DateFormat): void
setTimezone(timezone: string): void
setAutoSyncDateTime(autoSync: boolean): void

// Loader
setDisplayLoader(value: DisplayLoader): void

// Reset to defaults
reset(): void
```

### Usage Examples

```typescript
// Toggle theme
function SettingsApp() {
  const { currentTheme, setTheme } = useSystemUIState();

  const handleThemeToggle = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <button onClick={handleThemeToggle}>
      Switch to {currentTheme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}

// Toggle start menu
function Workspace() {
  const { startMenuOpen, setStartMenuOpen } = useSystemUIState();

  return (
    <>
      <StartMenuIcon onClick={() => setStartMenuOpen(!startMenuOpen)} />
      {startMenuOpen && <StartMenu />}
    </>
  );
}

// Apply brightness overlay
function Workspace() {
  const { brightnessLevel } = useSystemUIState();
  const brightnessOpacity = ((100 - brightnessLevel) / 100) * 0.8;

  return (
    <div style={{ opacity: brightnessOpacity }}>
      {/* Overlay */}
    </div>
  );
}
```

---

## useAuth - Authentication

**File:** `src/store/store.ts`

Manages user authentication state and permissions.

### State Properties

```typescript
interface AuthState {
  // Current logged-in user
  username: string | null; // null when logged out

  // User permissions
  isAdmin: boolean; // true if username === ADMIN
  isReadOnlyMode: boolean; // true if logged in but not admin

  // User profile
  uploadedUserAvatar?: string; // Avatar image URL
}
```

### State Actions

```typescript
// Update authentication state
updateAuthState(newUsername: string | null): void
// Sets isAdmin = (newUsername === ADMIN)
// Sets isReadOnlyMode = (newUsername !== null && newUsername !== ADMIN)

// Update user avatar
updateUserAvatar(imgUrl: string | undefined): void
```

### Usage Examples

```typescript
// Check permissions
function AdminSettings() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <div>Access Denied</div>;
  }

  return <AdminPanel />;
}

// Display user info
function Taskbar() {
  const { username } = useAuth();

  return <span>Logged in as: {username}</span>;
}

// Login flow
function LoginScreen() {
  const { updateAuthState } = useAuth();

  const handleLogin = (username) => {
    updateAuthState(username);
    // Redirect to workspace
  };

  return <LoginForm onSubmit={handleLogin} />;
}
```

---

## useBootStatus - Boot Sequence

**File:** `src/store/store.ts`

Manages application boot sequence and startup state.

### State Properties

```typescript
interface BootStatusState {
  // Boot state
  bootStatus: 'OFF' | 'BOOTING' | 'ON' | 'SHUTTING_DOWN';

  // Operations to show during boot/shutdown
  allOperations: string[]; // e.g., ['Initializing...', 'Loading...']

  // Current operation index (for sequential display)
  operationIndex: number;
}
```

### State Actions

```typescript
// Update boot status and operations
updateBootStatus(nextStatus: BootStatusType, username?: string): void
// Automatically loads appropriate operations based on status
// username is optional, used for personalized messages
```

### Usage Examples

```typescript
// Boot screen
function App() {
  const { bootStatus, allOperations, operationIndex } = useBootStatus();

  if (bootStatus !== 'ON') {
    return (
      <BootScreen
        status={bootStatus}
        operations={allOperations}
        currentIndex={operationIndex}
      />
    );
  }

  return <Workspace />;
}

// Shutdown
function PowerButton() {
  const { updateBootStatus } = useBootStatus();

  const handleShutdown = () => {
    updateBootStatus('SHUTTING_DOWN');
    // Show shutdown animation
  };

  return <button onClick={handleShutdown}>Power Off</button>;
}
```

---

## Store Relationships

### How Stores Interact

```
useAuth
  ↓
  Determines user permissions
  Controls access to features

useBootStatus
  ↓
  Runs before other stores
  Initializes app state

useSystemUIState ←→ useWorkspaceState
  ↑                     ↑
  Theme, brightness   Windows, layout
  Both read by components
```

### Store Initialization Order

1. **useBootStatus** - Shows loading screen
2. **useAuth** - Loads user session
3. **useWorkspaceState** - Initializes window state
4. **useSystemUIState** - Loads user preferences
5. Application ready

---
