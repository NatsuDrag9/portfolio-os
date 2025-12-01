import { Meta, StoryObj } from '@storybook/react';
import Taskbar from './Taskbar';
import { useSystemUIState, useWorkspaceState } from '@store/store';
import React from 'react';
import { APP_REGISTRY } from '@constants/desktopConstants';

const withStoreSetup = (
  systemUIState: Partial<ReturnType<typeof useSystemUIState.getState>>,
  workspaceState?: Partial<ReturnType<typeof useWorkspaceState.getState>>
) => {
  const StoreSetupDecorator = (Story: React.ComponentType) => {
    // Set state synchronously before render to avoid flash of default state
    useSystemUIState.setState(systemUIState);
    if (workspaceState) {
      useWorkspaceState.setState(workspaceState);
    }

    return <Story />;
  };

  StoreSetupDecorator.displayName = 'StoreSetupDecorator';
  return StoreSetupDecorator;
};

const meta: Meta<typeof Taskbar> = {
  title: 'Layout/Taskbar',
  component: Taskbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Windows 11 taskbar component that provides quick access to applications and system controls.

## Features
- **Start Menu**: Windows icon to open the Start Menu
- **Search Bar**: Quick search functionality
- **Pinned Apps**: Display and interact with pinned applications
- **System Tray**: Quick actions for WiFi, volume, battery, and language
- **Quick Actions Popup**: Access to brightness, volume sliders, and quick settings
- **Date & Time**: Live clock display in 12-hour format (DD-MM-YYYY)

## Taskbar Alignment
The taskbar supports multiple alignment positions:
- \`bottom\` (default): Traditional Windows 11 position
- \`top\`: macOS-style top bar
- \`left\`: Vertical left sidebar
- \`right\`: Vertical right sidebar
        `,
      },
    },
  },
  argTypes: {
    // Taskbar doesn't have direct props - it uses Zustand store
    // Document the store properties that affect Taskbar behavior
  },
  decorators: [
    (Story) => (
      <div style={{ height: '100vh', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Taskbar>;

export const Default: Story = {
  decorators: [
    withStoreSetup({
      taskbarAlignment: 'bottom',
      isSearchVisible: true,
      volumeLevel: 50,
      brightnessLevel: 30,
    }),
  ],
};

export const TopAligned: Story = {
  decorators: [
    withStoreSetup({
      taskbarAlignment: 'top',
      isSearchVisible: true,
      volumeLevel: 50,
      brightnessLevel: 30,
    }),
  ],
};

export const LeftAligned: Story = {
  decorators: [
    withStoreSetup({
      taskbarAlignment: 'left',
      isSearchVisible: true,
      volumeLevel: 50,
      brightnessLevel: 30,
    }),
  ],
};

export const RightAligned: Story = {
  decorators: [
    withStoreSetup({
      taskbarAlignment: 'right',
      isSearchVisible: true,
      volumeLevel: 50,
      brightnessLevel: 30,
    }),
  ],
};

export const SearchHidden: Story = {
  decorators: [
    withStoreSetup({
      taskbarAlignment: 'bottom',
      isSearchVisible: false,
      volumeLevel: 50,
      brightnessLevel: 30,
    }),
  ],
};

export const WithPinnedApps: Story = {
  decorators: [
    withStoreSetup(
      {
        taskbarAlignment: 'bottom',
        isSearchVisible: true,
        volumeLevel: 50,
        brightnessLevel: 30,
      },
      {
        taskbarPinnedAppIds: APP_REGISTRY.filter(
          (app) => app.defaultPinned === true
        ).map((item) => item.id),
        activeWindows: [],
      }
    ),
  ],
};

export const WithActiveWindows: Story = {
  decorators: [
    withStoreSetup(
      {
        taskbarAlignment: 'bottom',
        isSearchVisible: true,
        volumeLevel: 50,
        brightnessLevel: 30,
      },
      {
        taskbarPinnedAppIds: APP_REGISTRY.filter(
          (app) => app.defaultPinned === true
        ).map((item) => item.id),
        activeWindows: [
          {
            id: 'vscode-1',
            title: 'Visual Studio Code',
            windowName: 'VSCodeApp',
            isMaximized: true,
            position: { x: 100, y: 100 },
            zIndex: 1,
            size: { width: 800, height: 600 },
          },
        ],
        windowInstanceCounters: {
          vscode: 1,
        },
      }
    ),
  ],
};

export const VolumeMuted: Story = {
  decorators: [
    withStoreSetup({
      taskbarAlignment: 'bottom',
      isSearchVisible: true,
      volumeLevel: 0,
      brightnessLevel: 30,
    }),
  ],
};

export const LowBrightness: Story = {
  decorators: [
    withStoreSetup({
      taskbarAlignment: 'bottom',
      isSearchVisible: true,
      volumeLevel: 50,
      brightnessLevel: 10,
    }),
  ],
};
