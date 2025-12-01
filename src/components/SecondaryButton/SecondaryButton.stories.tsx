import { Meta, StoryObj } from '@storybook/react';
import SecondaryButton from './SecondaryButton';
import {
  ChevronRightRegular,
  AddRegular,
  SettingsRegular,
  ArrowLeftRegular,
} from '@fluentui/react-icons';
import {
  clickInteractionPlayFunction,
  iconLeftPlayFunction,
  iconRightPlayFunction,
  keyboardInteractionPlayFunction,
  noIconPlayFunction,
  secondaryButtonPlayFunction,
} from './playFunctions';
import { fn } from '@storybook/test';

const meta: Meta<typeof SecondaryButton> = {
  title: 'Components/SecondaryButton',
  component: SecondaryButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A secondary button component with optional icon positioning.

## Features
- **Icon Support**: Accepts any Fluent UI icon component
- **Icon Positioning**: Icon can be placed on the left or right side
- **Click Handler**: Optional callback for button clicks
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    icon: {
      description: 'Fluent UI icon component to display',
      control: false,
      table: {
        type: { summary: 'ComponentType<{ className: string }>' },
      },
    },
    name: {
      description: 'Button label text',
      control: 'text',
      table: {
        type: { summary: 'string' },
      },
    },
    iconPosition: {
      description: 'Position of the icon relative to the label',
      control: 'radio',
      options: ['left', 'right', undefined],
      table: {
        type: { summary: "'left' | 'right'" },
        defaultValue: { summary: 'undefined' },
      },
    },
    onButtonClick: {
      description: 'Callback function when button is clicked',
      action: 'clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
  },
  args: {
    onButtonClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof SecondaryButton>;

export const Default: Story = {
  args: {
    icon: ChevronRightRegular,
    name: 'More',
    iconPosition: 'right',
  },
  play: secondaryButtonPlayFunction,
};

export const IconLeft: Story = {
  args: {
    icon: AddRegular,
    name: 'Add Item',
    iconPosition: 'left',
  },
  play: iconLeftPlayFunction,
};

export const IconRight: Story = {
  args: {
    icon: ChevronRightRegular,
    name: 'More',
    iconPosition: 'right',
  },
  play: iconRightPlayFunction,
};

export const NoIcon: Story = {
  args: {
    icon: ChevronRightRegular,
    name: 'Submit',
    iconPosition: undefined,
  },
  play: noIconPlayFunction,
};

export const WithSettingsIcon: Story = {
  args: {
    icon: SettingsRegular,
    name: 'Settings',
    iconPosition: 'left',
  },
  play: secondaryButtonPlayFunction,
};

export const BackButton: Story = {
  args: {
    icon: ArrowLeftRegular,
    name: 'Back',
    iconPosition: 'left',
  },
  play: iconLeftPlayFunction,
};

export const ClickInteraction: Story = {
  args: {
    icon: ChevronRightRegular,
    name: 'Click Me',
    iconPosition: 'right',
  },
  play: clickInteractionPlayFunction,
};

export const KeyboardInteraction: Story = {
  args: {
    icon: ChevronRightRegular,
    name: 'Press Enter',
    iconPosition: 'right',
  },
  play: keyboardInteractionPlayFunction,
};

export const LongText: Story = {
  args: {
    icon: ChevronRightRegular,
    name: 'View All Recommended Applications',
    iconPosition: 'right',
  },
};

export const ShortText: Story = {
  args: {
    icon: AddRegular,
    name: 'Go',
    iconPosition: 'left',
  },
};
