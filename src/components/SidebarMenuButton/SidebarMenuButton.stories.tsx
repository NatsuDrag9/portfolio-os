import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import SidebarMenuButton from './SidebarMenuButton';
import {
  HomeRegular,
  SystemRegular,
  WindowBrushRegular,
  LaptopRegular,
  SpeakerEditRegular,
} from '@fluentui/react-icons';
import {
  playClickButton,
  playKeyboardInteraction,
  playActiveStateToggle,
  playMultipleButtonClicks,
} from './playFunctions';

const meta: Meta<typeof SidebarMenuButton> = {
  title: 'Components/SidebarMenuButton',
  component: SidebarMenuButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A sidebar navigation button component with icon and text label. Supports active state highlighting and keyboard accessibility. Commonly used in settings panels and navigation sidebars.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Label text displayed below the icon',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: false,
      description: 'Fluent UI icon component to display',
      table: {
        type: {
          summary: 'ComponentType<{ className?: string }>',
        },
      },
    },
    isActive: {
      control: 'boolean',
      description: 'Whether the button is in active/selected state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onButtonClick: {
      description: 'Callback function triggered when the button is clicked',
      table: {
        type: { summary: '() => void' },
      },
      action: 'button clicked',
    },
  },
  args: {
    name: 'Home',
    icon: HomeRegular,
    isActive: false,
    onButtonClick: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SidebarMenuButton>;

export const Default: Story = {
  args: {
    name: 'Home',
    icon: HomeRegular,
    isActive: false,
    onButtonClick: fn(),
  },
  play: playClickButton,
};

export const Active: Story = {
  args: {
    name: 'System',
    icon: SystemRegular,
    isActive: true,
    onButtonClick: fn(),
  },
  play: playKeyboardInteraction,
};

export const PersonalizationButton: Story = {
  args: {
    name: 'Personalization',
    icon: WindowBrushRegular,
    isActive: false,
    onButtonClick: fn(),
  },
  play: playActiveStateToggle,
};

export const Interactive: Story = {
  args: {
    name: 'Display',
    icon: LaptopRegular,
    isActive: false,
    onButtonClick: fn(),
  },
  play: playMultipleButtonClicks,
};

// Additional examples showing different icons
export const VolumeButton: Story = {
  args: {
    name: 'Volume',
    icon: SpeakerEditRegular,
    isActive: false,
    onButtonClick: fn(),
  },
};
