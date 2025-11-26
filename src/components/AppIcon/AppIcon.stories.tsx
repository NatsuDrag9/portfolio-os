import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import AppIcon from './AppIcon';
import appIconPlayFunction from './playFunctions';
import { useSystemUIState } from '@store/store';

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
        story: 'Taskbar icon variant - uses single-click to open applications',
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

// export const FileExplorerIcon: Story = {
//   args: {
//     appId: 'file-explorer',
//     iconVariant: 'taskbar',
//   },
//   parameters: {
//     docs: {
//       description: {
//         story: 'File Explorer application icon',
//       },
//     },
//   },
// };

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
