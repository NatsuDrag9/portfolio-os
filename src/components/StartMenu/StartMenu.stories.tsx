import { Meta, StoryObj } from '@storybook/react';
import React, { useEffect } from 'react';
import StartMenu from './StartMenu';
import { useSystemUIState, useWorkspaceState, useAuth } from '@store/store';
import startMenuPlayFunction, {
  startMenuPanelNavigationPlayFunction,
  startMenuUserCardPlayFunction,
  startMenuPowerOptionsPlayFunction,
  startMenuAppsPlayFunction,
  startMenuSearchResultsPlayFunction,
} from './playFunctions';

/**
 * Decorator to set up store state for stories
 */
const withStoreSetup = (
  systemUIState: Partial<ReturnType<typeof useSystemUIState.getState>>,
  workspaceState?: Partial<ReturnType<typeof useWorkspaceState.getState>>,
  authState?: Partial<ReturnType<typeof useAuth.getState>>
) => {
  const StoreSetupDecorator = (Story: React.ComponentType) => {
    useEffect(() => {
      useSystemUIState.setState(systemUIState);
      if (workspaceState) {
        useWorkspaceState.setState(workspaceState);
      }
      if (authState) {
        useAuth.setState(authState);
      }
    }, []);

    return <Story />;
  };

  StoreSetupDecorator.displayName = 'StoreSetupDecorator';
  return StoreSetupDecorator;
};

const meta: Meta<typeof StartMenu> = {
  title: 'Layout/StartMenu',
  component: StartMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Windows 11 Start Menu component that provides access to applications, user account, and power options.

## Features
- **Panel One (Default View)**: Shows pinned/default apps and recommended apps
- **Panel Two (All Apps)**: Alphabetically grouped list of all applications
- **User Section**: Displays current user with expandable profile card
- **Power Options**: Sign out and power off functionality
- **Click Outside**: Automatically closes when clicking outside the menu

## Navigation
- Click "All" button to view all apps (Panel Two)
- Click "Back" button to return to default view (Panel One)

## Panels
- \`panel-one\`: Default view with pinned and recommended apps
- \`panel-two\`: All apps view grouped alphabetically
        `,
      },
    },
  },
  argTypes: {
    // StartMenu doesn't have direct props - it uses Zustand stores
    // The component behavior is controlled by store state
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: '600px',
          height: '700px',
          position: 'relative',
          //   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '8px',
          padding: '20px',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof StartMenu>;

export const Default: Story = {
  decorators: [
    withStoreSetup(
      {
        startMenuOpen: true,
        startMenuLayout: 'grid',
        showRecommendedApps: true,
      },
      {
        taskbarPinnedAppIds: ['file-explorer', 'edge', 'vscode'],
        activeWindows: [],
      },
      {
        username: 'Natsu',
      }
    ),
  ],
  play: startMenuPlayFunction,
};

export const PanelNavigation: Story = {
  decorators: [
    withStoreSetup(
      {
        startMenuOpen: true,
        startMenuLayout: 'grid',
        showRecommendedApps: true,
      },
      {
        taskbarPinnedAppIds: ['file-explorer', 'edge', 'vscode'],
        activeWindows: [],
      },
      {
        username: 'Natsu',
      }
    ),
  ],
  play: startMenuPanelNavigationPlayFunction,
};

export const UserCardInteraction: Story = {
  decorators: [
    withStoreSetup(
      {
        startMenuOpen: true,
        startMenuLayout: 'grid',
        showRecommendedApps: true,
      },
      {
        taskbarPinnedAppIds: [],
        activeWindows: [],
      },
      {
        username: 'Natsu',
      }
    ),
  ],
  play: startMenuUserCardPlayFunction,
};

export const SearchResults: Story = {
  decorators: [
    withStoreSetup(
      {
        startMenuOpen: true,
        startMenuLayout: 'grid',
        showRecommendedApps: true,
        searchValue: '', // Will be set in play function
      },
      {
        taskbarPinnedAppIds: ['file-explorer', 'edge', 'vscode'],
        activeWindows: [],
      },
      {
        username: 'Natsu',
      }
    ),
  ],
  play: startMenuSearchResultsPlayFunction,
};

export const PowerOptionsInteraction: Story = {
  decorators: [
    withStoreSetup(
      {
        startMenuOpen: true,
        startMenuLayout: 'grid',
        showRecommendedApps: true,
      },
      {
        taskbarPinnedAppIds: [],
        activeWindows: [],
      },
      {
        username: 'Natsu',
      }
    ),
  ],
  play: startMenuPowerOptionsPlayFunction,
};

export const AppsRendering: Story = {
  decorators: [
    withStoreSetup(
      {
        startMenuOpen: true,
        startMenuLayout: 'grid',
        showRecommendedApps: true,
      },
      {
        taskbarPinnedAppIds: ['file-explorer', 'edge', 'vscode', 'terminal'],
        activeWindows: [],
      },
      {
        username: 'Natsu',
      }
    ),
  ],
  play: startMenuAppsPlayFunction,
};
