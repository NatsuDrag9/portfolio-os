import type { Meta, StoryObj } from '@storybook/react';
import Loader from './Loader';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A loading spinner component with animated text display. Shows either custom text or default tech stack information. Useful for loading states, splash screens, or while waiting for data to load.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    customText: {
      description:
        'Array of custom text strings to display below the spinner. If not provided, displays default tech stack information.',
      table: {
        type: {
          summary: 'string[]',
          detail: 'Array of strings to be displayed sequentially',
        },
        defaultValue: {
          summary: 'undefined',
          detail:
            'When undefined, displays: "React + Typescript", "Vite", "Zustand store", "Microsoft Fluent UI and Design Tokens"',
        },
        category: 'Props',
      },
      control: 'object',
    },
    fullscreen: {
      description:
        'When enabled, loader fills the entire screen with a backdrop. Useful for page transitions and full-page loading states.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
        category: 'Props',
      },
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Default loader with tech stack information. Displays React + TypeScript, Vite, Zustand store, and Microsoft Fluent UI text.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '400px',
          width: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const CustomSingleLine: Story = {
  args: {
    customText: ['Loading your dashboard...'],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader with a single custom text line. Useful for simple loading messages.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '400px',
          width: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const CustomMultipleLines: Story = {
  args: {
    customText: [
      'Fetching user data...',
      'Loading portfolio...',
      'Calculating analytics...',
      'Almost there!',
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader with multiple custom text lines. Ideal for showing progress through multiple loading steps.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '400px',
          width: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export const Fullscreen: Story = {
  args: {
    customText: ['Welcome', 'Loading your workspace...'],
    fullscreen: true,
  },
  parameters: {
    layout: 'fullscreen', // Override layout for fullscreen story
    docs: {
      description: {
        story:
          'Fullscreen loader that covers the entire viewport. Perfect for page transitions, login screens, or initial app loading states. Features a semi-transparent backdrop with centered content.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
};

export const LongTextExample: Story = {
  args: {
    customText: [
      'Preparing your investment advisory dashboard',
      'Syncing real-time market data',
      'This may take a few moments',
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Loader with longer text lines. Demonstrates how the component handles more verbose loading messages.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          height: '400px',
          width: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
