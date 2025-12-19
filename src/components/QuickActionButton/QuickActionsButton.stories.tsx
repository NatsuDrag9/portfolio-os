import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  WeatherMoonRegular,
  WeatherMoonFilled,
  AirplaneFilled,
  AirplaneRegular,
  SettingsRegular,
  SettingsFilled,
  WeatherSunnyRegular,
} from '@fluentui/react-icons';
import QuickActionButton from './QuickActionButton';
import quickActionButtonPlayFunction, {
  quickActionButtonActivePlayFunction,
  quickActionButtonClickPlayFunction,
  quickActionButtonKeyboardPlayFunction,
  quickActionButtonNoCallbackPlayFunction,
} from './playFunctions';

const meta: Meta<typeof QuickActionButton> = {
  title: 'Components/QuickActionButton',
  component: QuickActionButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A toggleable quick action button used in the Windows 11 Action Center. Displays an icon that changes based on the isActive prop, with a label underneath.',
      },
    },
  },
  argTypes: {
    actionType: {
      control: 'radio',
      options: ['night-light', 'airplane', 'settings'],
      description: 'The type of quick action this button represents',
      table: {
        type: { summary: "'night-light' | 'airplane' | 'settings'" },
      },
    },
    components: {
      description: 'Object containing default and clicked icon components',
      table: {
        type: {
          summary: '{ default: ComponentType, clicked: ComponentType }',
        },
      },
    },
    name: {
      control: 'text',
      description: 'Label displayed below the button',
      table: {
        type: { summary: 'string' },
      },
    },
    isActive: {
      control: 'boolean',
      description: 'Whether the button is in active state',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onButtonClick: {
      action: 'buttonClicked',
      description: 'Callback fired when button is clicked, receives actionType',
      table: {
        type: { summary: '(actionType: QuickActionsType) => void' },
      },
    },
  },
  args: {
    onButtonClick: fn(),
    isActive: false,
  },
};

export default meta;
type Story = StoryObj<typeof QuickActionButton>;

export const NightLight: Story = {
  args: {
    actionType: 'night-light',
    name: 'Night light',
    isActive: false,
    components: {
      default: WeatherMoonRegular,
      clicked: WeatherSunnyRegular,
    },
  },
  play: quickActionButtonPlayFunction,
};

export const AirplaneMode: Story = {
  args: {
    actionType: 'airplane',
    name: 'Airplane mode',
    isActive: false,
    components: {
      default: AirplaneRegular,
      clicked: AirplaneFilled,
    },
  },
  play: quickActionButtonPlayFunction,
};

export const Settings: Story = {
  args: {
    actionType: 'settings',
    name: 'Settings',
    isActive: false,
    components: {
      default: SettingsRegular,
      clicked: SettingsFilled,
    },
  },
  play: quickActionButtonPlayFunction,
};

export const ActiveState: Story = {
  args: {
    actionType: 'night-light',
    name: 'Night light',
    isActive: true,
    components: {
      default: WeatherMoonRegular,
      clicked: WeatherSunnyRegular,
    },
  },
  play: quickActionButtonActivePlayFunction,
};

export const ClickToggleTest: Story = {
  args: {
    actionType: 'night-light',
    name: 'Night light',
    isActive: false,
    components: {
      default: WeatherMoonRegular,
      clicked: WeatherMoonFilled,
    },
  },
  play: quickActionButtonClickPlayFunction,
};

export const KeyboardAccessibilityTest: Story = {
  args: {
    actionType: 'airplane',
    name: 'Airplane mode',
    isActive: false,
    components: {
      default: AirplaneRegular,
      clicked: AirplaneFilled,
    },
  },
  play: quickActionButtonKeyboardPlayFunction,
};

export const NoCallbackTest: Story = {
  args: {
    actionType: 'settings',
    name: 'Settings',
    isActive: false,
    components: {
      default: SettingsRegular,
      clicked: SettingsFilled,
    },
    onButtonClick: undefined,
  },
  play: quickActionButtonNoCallbackPlayFunction,
};
