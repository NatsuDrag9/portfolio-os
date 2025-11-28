import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import AppIcon from './AppIcon';
import appIconPlayFunction, {
  appIconContextMenuPlayFunction,
  appIconDotPlayFunction,
  appIconPopupPlayFunction,
} from './playFunctions';
import { useSystemUIState, useWorkspaceState } from '@store/store';

export default {
  title: 'Applications/AppIcon',
  component: AppIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `The \`AppIcon\` component displays an application icon that can be clicked to open the application.

**Variants:**
- \`desktop\`: Double-click to open apps, displays icon + name
- \`taskbar\`: Single-click to open apps, displays icon only with dot indicator and hover popup
- \`start-menu\`: Single-click to open apps, displays icon + name

**Sub-components:**
- \`ActiveWindowsPopup\`: Hover popup for taskbar variant showing all open windows for the app. Allows focusing or closing individual windows.
- \`ContextMenu\` (planned): Right-click menu with options like "New window", "Pin/Unpin from taskbar", "Close window(s)"

**Features:**
- Custom icon shapes: square, circle, water-droplet
- Dot indicator states: hidden (no windows), unfocused (grey), focused (accent color pill)
- Multiple windows stacked effect (::before pseudo-element)
- Keyboard accessible with Enter/Space support
- Uses CSS \`:has()\` to prevent hover/active states when interacting with popup`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    appId: {
      control: 'select',
      options: [
        'file-explorer',
        'google-chrome',
        'vscode',
        'firefox',
        'notepad',
        'github',
      ],
      description: 'The unique identifier of the application from APP_REGISTRY',
      table: {
        type: { summary: 'string' },
      },
    },
    iconVariant: {
      control: 'select',
      options: ['desktop', 'taskbar', 'start-menu'],
      description:
        'Variant that determines icon size and click behavior. Desktop uses double-click, taskbar/start-menu uses single-click.',
      table: {
        type: { summary: "'desktop' | 'taskbar' | 'start-menu'" },
      },
    },
    shape: {
      control: 'select',
      options: ['square', 'circle', 'water-droplet'],
      description: 'Optional custom shape for the icon (CSS class applied)',
      table: {
        type: { summary: "'square' | 'circle' | 'water-droplet'" },
      },
    },
    onSingleClick: {
      action: 'Single clicked',
      description:
        'Callback function triggered on single-click (taskbar/start-menu variants). Called by parent to launch/add window.',
      table: {
        type: { summary: '(appId: string) => void' },
      },
    },
    onDoubleClick: {
      action: 'Double clicked',
      description:
        'Callback function triggered on double-click (desktop variant). Called by parent to launch/add window.',
      table: {
        type: { summary: '(appId: string) => void' },
      },
    },
    onRightClick: {
      action: 'Right clicked',
      description:
        'Callback function triggered on right-click. Called by parent for context menu.',
      table: {
        type: { summary: '(appId: string) => void' },
      },
    },
    onWindowFocus: {
      action: 'Window focused',
      description:
        'Callback function triggered when popup item is clicked. Parent handles bringing window to front.',
      table: {
        type: { summary: '(windowId: string) => void' },
      },
    },
    onWindowClose: {
      action: 'Window closed',
      description:
        'Callback function triggered when popup close button is clicked. Parent handles window removal.',
      table: {
        type: { summary: '(windowId: string) => void' },
      },
    },
  },
  args: {
    appId: 'vscode',
    iconVariant: 'desktop',
    onSingleClick: fn(),
    onDoubleClick: fn(),
    onWindowFocus: fn(),
    onWindowClose: fn(),
  },
  decorators: [
    // Global decorator to reset store state before each story
    (Story) => {
      useSystemUIState.setState({
        taskbarAlignment: 'bottom',
        isSearchVisible: true,
        startMenuOpen: false,
        startMenuLayout: 'grid',
        showRecommendedApps: true,
        showMoreIcons: true,
        volumeLevel: 50,
        currentTheme: 'light',
      });

      useWorkspaceState.setState({
        activeWindows: [],
        taskbarPinnedAppIds: [],
        activeBackground: '/default-wallpaper.jpg',
        windowInstanceCounters: {},
      });

      return <Story />;
    },
  ],
} as Meta<typeof AppIcon>;

type Story = StoryObj<typeof AppIcon>;

export const DesktopIcon: Story = {
  args: {
    appId: 'vscode',
    iconVariant: 'desktop',
    shape: 'square',
  },
  parameters: {
    docs: {
      description: {
        story: 'Desktop icon variant - uses double-click to open applications',
      },
    },
  },
};

export const TaskbarIcon: Story = {
  args: {
    appId: 'google-chrome',
    iconVariant: 'taskbar',
    shape: 'square',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Taskbar icon variant with no open windows - uses single-click to open applications. ',
      },
    },
  },
};

export const StartMenuIcon: Story = {
  args: {
    appId: 'notepad',
    iconVariant: 'start-menu',
    shape: 'square',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Start menu icon variant - uses single-click to open applications',
      },
    },
  },
};

export const CircleShape: Story = {
  args: {
    appId: 'github',
    iconVariant: 'desktop',
    shape: 'circle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon with circular shape variant',
      },
    },
  },
};

export const WaterDropletShape: Story = {
  args: {
    appId: 'firefox',
    iconVariant: 'desktop',
    shape: 'water-droplet',
  },
  parameters: {
    docs: {
      description: {
        story: 'Icon with water droplet shape variant',
      },
    },
  },
};

export const AppIconWithInteractions: Story = {
  name: 'AppIcon with Play Function',
  args: {
    appId: 'vscode',
    iconVariant: 'desktop',
    shape: 'square',
    onSingleClick: fn(),
    onDoubleClick: fn(),
    onRightClick: fn(),
  },
  play: appIconPlayFunction,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive story demonstrating click behaviors for desktop variant (double-click to open)',
      },
    },
  },
};

export const AppIconTaskbarInteractions: Story = {
  name: 'AppIcon Taskbar with Play Function',
  args: {
    appId: 'google-chrome',
    iconVariant: 'taskbar',
    shape: 'square',
    onSingleClick: fn(),
    onDoubleClick: fn(),
    onRightClick: fn(),
  },
  play: appIconPlayFunction,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive story demonstrating click behaviors for taskbar variant (single-click to open)',
      },
    },
  },
};

export const DarkTheme: Story = {
  args: {
    appId: 'vscode',
    iconVariant: 'desktop',
    shape: 'square',
  },
  decorators: [
    (Story) => {
      useSystemUIState.getState().setTheme('dark');
      return (
        <div
          style={{
            padding: '2rem',
            borderRadius: '8px',
          }}
        >
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Desktop icon with dark theme styling - shows text shadow and adjusted hover states for dark backgrounds',
      },
    },
  },
};

export const TaskbarWithOpenWindow: Story = {
  name: 'Taskbar with Open Unfocused Window',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square',
  },
  decorators: [
    (Story) => {
      // Add a window to the workspace
      const { addWindow } = useWorkspaceState.getState();
      const appMetadata = {
        id: 'vscode',
        appName: 'VSCode',
        desktopIcon: '/apps/vscode-96.png',
        mobileIcon: '/apps/vscode-48.png',
        defaultPinned: true,
        windowName: 'VSCodeApp',
      };
      addWindow('vscode', appMetadata);

      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Taskbar icon with one open unfocused window - dot indicator shows unfocused state',
      },
    },
  },
};

export const TaskbarWithFocusedWindow: Story = {
  name: 'Taskbar with Open Focused Window',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square',
  },
  decorators: [
    (Story) => {
      // Add a window to the workspace and set its zIndex to highest
      const { addWindow, updateWindowZIndex, setWindowIsMaximized } =
        useWorkspaceState.getState();
      const appMetadata = {
        id: 'vscode',
        appName: 'VSCode',
        desktopIcon: '/apps/vscode-96.png',
        mobileIcon: '/apps/vscode-48.png',
        defaultPinned: true,
        windowName: 'VSCodeApp',
      };
      addWindow('vscode', appMetadata);

      const state = useWorkspaceState.getState();
      const lastWindow = state.activeWindows[state.activeWindows.length - 1];
      if (lastWindow.id) {
        updateWindowZIndex(lastWindow.id, 9999); // Set highest zIndex
        setWindowIsMaximized(lastWindow.id, true); // Set isMaximized
      }

      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Taskbar icon with one open focused window - dot indicator shows focused state. Hover over the taskbar icon to see the popup.',
      },
    },
  },
};

export const TaskbarWithMultipleWindowsAndUnfocused: Story = {
  name: 'Taskbar with Multiple Open Windows and Unfocused',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square',
  },
  decorators: [
    (Story) => {
      // Add multiple windows to the workspace
      const { addWindow } = useWorkspaceState.getState();
      const appMetadata = {
        id: 'vscode',
        appName: 'VSCode',
        desktopIcon: '/apps/vscode-96.png',
        mobileIcon: '/apps/vscode-48.png',
        defaultPinned: true,
        windowName: 'VSCodeApp',
      };
      addWindow('vscode', appMetadata);
      addWindow('vscode', appMetadata);
      addWindow('vscode', appMetadata);

      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Taskbar icon with three open windows - dot indicator shows unfocused state. Hover over the taskbar icon to see the popup with all windows listed.',
      },
    },
  },
};

export const TaskbarWithMultipleWindows: Story = {
  name: 'Taskbar with Multiple Open Windows and Focused',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square',
  },
  decorators: [
    (Story) => {
      // Add multiple windows to the workspace
      const { addWindow, updateWindowZIndex, setWindowIsMaximized } =
        useWorkspaceState.getState();
      const appMetadata = {
        id: 'vscode',
        appName: 'VSCode',
        desktopIcon: '/apps/vscode-96.png',
        mobileIcon: '/apps/vscode-48.png',
        defaultPinned: true,
        windowName: 'VSCodeApp',
      };
      addWindow('vscode', appMetadata);
      addWindow('vscode', appMetadata);
      addWindow('vscode', appMetadata);

      // Set last window as focused (highest zIndex)
      const state = useWorkspaceState.getState();
      const lastWindow = state.activeWindows[state.activeWindows.length - 1];
      if (lastWindow.id) {
        updateWindowZIndex(lastWindow.id, 9999);
        setWindowIsMaximized(lastWindow.id, true); // Set isMaximized
      }

      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Taskbar icon with three open windows - dot indicator shows focused state for the highest zIndex window. Hover over the taskbar icon to see the popup with all windows listed.',
      },
    },
  },
};

export const TaskbarDotInteractions: Story = {
  name: 'Taskbar Dot Indicator with Play Function',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square',
    onSingleClick: fn(),
  },
  decorators: [
    (Story) => {
      // Add a window to show dot indicator
      const { addWindow } = useWorkspaceState.getState();
      const appMetadata = {
        id: 'vscode',
        appName: 'VSCode',
        desktopIcon: '/apps/vscode-96.png',
        mobileIcon: '/apps/vscode-48.png',
        defaultPinned: true,
        windowName: 'VSCodeApp',
      };
      addWindow('vscode', appMetadata);

      return <Story />;
    },
  ],
  play: appIconDotPlayFunction,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive story demonstrating taskbar dot indicator behavior when windows are open',
      },
    },
  },
};

export const TaskbarPopupDarkTheme: Story = {
  name: 'Taskbar Popup - Dark Theme',
  args: {
    appId: 'google-chrome',
    iconVariant: 'taskbar',
    shape: 'square',
    onWindowFocus: fn(),
    onWindowClose: fn(),
  },
  decorators: [
    (Story) => {
      useSystemUIState.getState().setTheme('dark');

      // Add multiple windows
      const { addWindow } = useWorkspaceState.getState();
      const appMetadata = {
        id: 'google-chrome',
        appName: 'Google Chrome',
        desktopIcon: '/apps/chrome-96.png',
        mobileIcon: '/apps/chrome-48.png',
        defaultPinned: true,
        windowName: 'ChromeApp',
      };
      addWindow('google-chrome', appMetadata);
      addWindow('google-chrome', appMetadata);

      return <Story />;
    },
  ],
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story:
          'Taskbar icon popup with dark theme - shows acrylic material effect on dark background. Hover to see the popup.',
      },
    },
  },
};

export const TaskbarPopupInteractions: Story = {
  name: 'Taskbar Popup - Click & Close Interactions',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square',
    onSingleClick: fn(),
    onWindowFocus: fn(),
    onWindowClose: fn(),
  },
  decorators: [
    (Story) => {
      // Add multiple windows for popup interaction
      const { addWindow } = useWorkspaceState.getState();
      const appMetadata = {
        id: 'vscode',
        appName: 'VSCode',
        desktopIcon: '/apps/vscode-96.png',
        mobileIcon: '/apps/vscode-48.png',
        defaultPinned: true,
        windowName: 'VSCodeApp',
      };
      addWindow('vscode', appMetadata);
      addWindow('vscode', appMetadata);

      return <Story />;
    },
  ],
  play: appIconPopupPlayFunction,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive story testing popup window click and close button functionality with callback handlers',
      },
    },
  },
};

export const DesktopIconContextMenu: Story = {
  name: 'Desktop Icon - Right Click Context Menu (Unpinned)',
  args: {
    appId: 'vscode',
    iconVariant: 'desktop',
    shape: 'square',
    isPinned: false,
    onContextMenuItemClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Desktop icon context menu when app is unpinned from taskbar. Shows "Open", "Pin to taskbar", and "Properties" options.',
      },
    },
  },
};

export const DesktopIconContextMenuPinned: Story = {
  name: 'Desktop Icon - Right Click Context Menu (Pinned)',
  args: {
    appId: 'vscode',
    iconVariant: 'desktop',
    shape: 'square',
    isPinned: true,
    onContextMenuItemClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Desktop icon context menu when app is pinned to taskbar. Shows "Open", "Unpin from taskbar", and "Properties" options.',
      },
    },
  },
};

export const TaskbarIconContextMenuNoWindows: Story = {
  name: 'Taskbar Icon - Right Click Context Menu (No Windows)',
  args: {
    appId: 'google-chrome',
    iconVariant: 'taskbar',
    shape: 'square',
    isPinned: true,
    onContextMenuItemClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Taskbar icon context menu with no open windows. Shows "New window" and "Unpin from taskbar" options.',
      },
    },
  },
};

export const TaskbarIconContextMenuWithWindows: Story = {
  name: 'Taskbar Icon - Right Click Context Menu (Single Window)',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square',
    isPinned: true,
    onContextMenuItemClick: fn(),
  },
  decorators: [
    (Story) => {
      // Add a single window to the workspace
      const { addWindow } = useWorkspaceState.getState();
      const appMetadata = {
        id: 'vscode',
        appName: 'VSCode',
        desktopIcon: '/apps/vscode-96.png',
        mobileIcon: '/apps/vscode-48.png',
        defaultPinned: true,
        windowName: 'VSCodeApp',
      };
      addWindow('vscode', appMetadata);

      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Taskbar icon context menu with one open window. Shows "New window", "Unpin from taskbar", and "Close window" (destructive) options.',
      },
    },
  },
};

export const TaskbarIconContextMenuWithMultipleWindows: Story = {
  name: 'Taskbar Icon - Right Click Context Menu (Multiple Windows)',
  args: {
    appId: 'notepad',
    iconVariant: 'taskbar',
    shape: 'square',
    isPinned: true,
    onContextMenuItemClick: fn(),
  },
  decorators: [
    (Story) => {
      // Add multiple windows to the workspace
      const { addWindow } = useWorkspaceState.getState();
      const appMetadata = {
        id: 'notepad',
        appName: 'Notepad',
        desktopIcon: '/apps/notepad-96.png',
        mobileIcon: '/apps/notepad-48.png',
        defaultPinned: false,
        windowName: 'NotepadApp',
      };
      addWindow('notepad', appMetadata);
      addWindow('notepad', appMetadata);
      addWindow('notepad', appMetadata);

      return <Story />;
    },
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Taskbar icon context menu with three open windows. Shows "New window", "Unpin from taskbar", "Close window" (single), and "Close all windows" (destructive, multiple) options.',
      },
    },
  },
};

export const StartMenuIconContextMenuUnpinned: Story = {
  name: 'Start Menu Icon - Right Click Context Menu (Unpinned)',
  args: {
    appId: 'firefox',
    iconVariant: 'start-menu',
    shape: 'square',
    isPinned: false,
    onContextMenuItemClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Start menu icon context menu when app is unpinned from taskbar. Shows "Open" and "Pin to taskbar" options.',
      },
    },
  },
};

export const StartMenuIconContextMenuPinned: Story = {
  name: 'Start Menu Icon - Right Click Context Menu (Pinned)',
  args: {
    appId: 'firefox',
    iconVariant: 'start-menu',
    shape: 'square',
    isPinned: true,
    onContextMenuItemClick: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Start menu icon context menu when app is pinned to taskbar. Shows "Open" and "Unpin from taskbar" options.',
      },
    },
  },
};

export const ContextMenuInteractions: Story = {
  name: 'Context Menu - Click & Close Interactions',
  args: {
    appId: 'vscode',
    iconVariant: 'taskbar',
    shape: 'square',
    isPinned: true,
    onRightClick: fn(),
    onContextMenuItemClick: fn(),
  },
  decorators: [
    (Story) => {
      // Add a window to show context menu with window-related options
      const { addWindow } = useWorkspaceState.getState();
      const appMetadata = {
        id: 'vscode',
        appName: 'VSCode',
        desktopIcon: '/apps/vscode-96.png',
        mobileIcon: '/apps/vscode-48.png',
        defaultPinned: true,
        windowName: 'VSCodeApp',
      };
      addWindow('vscode', appMetadata);

      return <Story />;
    },
  ],
  play: appIconContextMenuPlayFunction,
  parameters: {
    docs: {
      description: {
        story:
          'Interactive story testing context menu item clicks and closing behavior. Right-click the icon to see the menu, click an item to trigger the callback.',
      },
    },
  },
};
