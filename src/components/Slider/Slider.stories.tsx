import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import Slider, { SliderProps } from './Slider';
import { SliderForType } from '@definitions/desktopTypes';
import sliderPlayFunction, {
  sliderVolumeIconPlayFunction,
  sliderBrightnessIconPlayFunction,
  sliderInteractionPlayFunction,
  sliderZeroValuePlayFunction,
  sliderMaxValuePlayFunction,
} from './playFunctions';

const SliderWithState = (args: SliderProps) => {
  const [value, setValue] = useState(args.sliderValue);

  const handleChange = (newValue: number, sliderFor: SliderForType) => {
    setValue(newValue);
    args.onSliderChange(newValue, sliderFor);
  };

  return <Slider {...args} sliderValue={value} onSliderChange={handleChange} />;
};

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A reusable slider component designed for brightness and volume controls. Displays contextual icons based on the slider type and current value.',
      },
    },
  },
  argTypes: {
    sliderFor: {
      control: 'radio',
      options: ['volume', 'brightness'],
      description: 'Determines the slider type and associated icons',
      table: {
        type: { summary: 'SliderForType' },
        defaultValue: { summary: 'volume' },
      },
    },
    sliderValue: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current value of the slider (0-100)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '50' },
      },
    },
    alignment: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of the slider',
      table: {
        type: { summary: "'horizontal' | 'vertical'" },
        defaultValue: { summary: 'horizontal' },
      },
    },
    onSliderChange: {
      action: 'sliderChanged',
      description:
        'Callback fired when slider value changes. Receives the new value and slider type.',
      table: {
        type: {
          summary: '(value: number, sliderFor: SliderForType) => void',
        },
      },
    },
  },
  args: {
    onSliderChange: fn(),
  },
  render: (args) => <SliderWithState {...args} />,
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const VolumeDefault: Story = {
  args: {
    sliderFor: 'volume',
    sliderValue: 50,
  },
  play: sliderPlayFunction,
};

export const VolumeMuted: Story = {
  args: {
    sliderFor: 'volume',
    sliderValue: 0,
  },
  play: sliderZeroValuePlayFunction,
};

export const VolumeMax: Story = {
  args: {
    sliderFor: 'volume',
    sliderValue: 100,
  },
  play: sliderMaxValuePlayFunction,
};

export const BrightnessDefault: Story = {
  args: {
    sliderFor: 'brightness',
    sliderValue: 50,
  },
  play: sliderPlayFunction,
};

export const BrightnessLow: Story = {
  args: {
    sliderFor: 'brightness',
    sliderValue: 0,
  },
  play: sliderZeroValuePlayFunction,
};

export const BrightnessMax: Story = {
  args: {
    sliderFor: 'brightness',
    sliderValue: 100,
  },
  play: sliderMaxValuePlayFunction,
};

export const VolumeIconTest: Story = {
  args: {
    sliderFor: 'volume',
    sliderValue: 75,
  },
  play: sliderVolumeIconPlayFunction,
};

export const BrightnessIconTest: Story = {
  args: {
    sliderFor: 'brightness',
    sliderValue: 75,
  },
  play: sliderBrightnessIconPlayFunction,
};

export const InteractionTest: Story = {
  args: {
    sliderFor: 'volume',
    sliderValue: 50,
  },
  play: sliderInteractionPlayFunction,
};

// Vertical alignment stories
export const VolumeVertical: Story = {
  args: {
    sliderFor: 'volume',
    sliderValue: 50,
    alignment: 'vertical',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Volume slider in vertical orientation for use in side-aligned taskbars.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '20rem', display: 'flex', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export const BrightnessVertical: Story = {
  args: {
    sliderFor: 'brightness',
    sliderValue: 50,
    alignment: 'vertical',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Brightness slider in vertical orientation for use in side-aligned taskbars.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ height: '20rem', display: 'flex', alignItems: 'center' }}>
        <Story />
      </div>
    ),
  ],
};

export const VerticalSliders: Story = {
  args: {
    sliderFor: 'volume',
    sliderValue: 50,
    alignment: 'vertical',
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story:
          'Both sliders in vertical orientation, demonstrating the layout for vertical taskbar quick actions.',
      },
    },
  },
  render: (args) => (
    <div
      style={{
        height: '20rem',
        display: 'flex',
        flexDirection: 'row',
        gap: '2rem',
        alignItems: 'center',
      }}
    >
      <SliderWithState {...args} sliderFor="brightness" />
      <SliderWithState {...args} sliderFor="volume" />
    </div>
  ),
};
