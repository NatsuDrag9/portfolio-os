import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import AppIcon from './AppIcon';
import appIconPlayFunction, { appIconDotPlayFunction } from './playFunctions';
import { useSystemUIState, useWorkspaceState } from '@store/store';

export default {
  title: 'Applications/AppIcon',
  component: AppIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'The `AppIcon` component displays an application icon that can be clicked to open the application. Supports different variants (desktop, taskbar, start-menu) and custom icon shapes. Single-click opens apps on taskbar/start-menu, double-click opens apps on desktop.',
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
        'Callback function triggered on single-click (taskbar/start-menu variants)',
      table: {
        type: { summary: '(appId: string) => void' },
      },
    },
    onDoubleClick: {
      action: 'Double clicked',
      description:
        'Callback function triggered on double-click (desktop variant)',
      table: {
        type: { summary: '(appId: string) => void' },
      },
    },
    onRightClick: {
      action: 'Right clicked',
      description:
        'Callback function triggered on right-click (desktop variant)',
      table: {
        type: { summary: '(appId: string) => void' },
      },
    },
  },
  args: {
    appId: 'vscode',
    iconVariant: 'desktop',
    onSingleClick: fn(),
    onDoubleClick: fn(),
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
            backgroundColor: '#1a1a2e',
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
          'Taskbar icon with one open focused window - dot indicator shows focused state',
      },
    },
  },
};

export const TaskbarWithMultipleWindows: Story = {
  name: 'Taskbar with Multiple Open Windows',
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
          'Taskbar icon with three open windows - dot indicator shows focused state for the highest zIndex window',
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
