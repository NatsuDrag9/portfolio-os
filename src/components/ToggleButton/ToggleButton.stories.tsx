import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ToggleButton from './ToggleButton';
import {
  playToggleToActive,
  playToggleWithDelay,
  playRapidToggle,
} from './playFunctions';

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggle button component that switches between active and inactive states. Supports disabled state and keyboard accessibility.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Label text displayed next to the toggle button',
      table: {
        type: { summary: 'string' },
      },
    },
    isActive: {
      control: 'boolean',
      description: 'Current state of the toggle button',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the toggle button is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onToggleClick: {
      description: 'Callback function triggered when the toggle is clicked',
      table: {
        type: { summary: '(value: boolean) => void' },
      },
      action: 'toggled',
    },
  },
  args: {
    name: 'Toggle Setting',
    isActive: false,
    isDisabled: false,
    onToggleClick: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const Inactive: Story = {
  args: {
    name: 'Wi-Fi',
    isActive: false,
    isDisabled: false,
  },
  play: playToggleToActive,
};

export const Active: Story = {
  args: {
    name: 'Bluetooth',
    isActive: true,
    isDisabled: false,
  },
  play: playToggleWithDelay,
};

export const Disabled: Story = {
  args: {
    name: 'Location Services',
    isActive: false,
    isDisabled: true,
  },
};

export const Interactive: Story = {
  args: {
    name: 'Dark Mode',
    isActive: false,
    isDisabled: false,
  },
  play: playRapidToggle,
};
