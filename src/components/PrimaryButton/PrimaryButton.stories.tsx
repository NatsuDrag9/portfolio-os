import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import PrimaryButton, { PrimaryButtonProps } from './PrimaryButton';
import {
  playClickButton,
  playKeyboardInteraction,
  playFormSubmit,
  playMultipleClicks,
} from './playFunctions';

const meta: Meta<PrimaryButtonProps> = {
  title: 'Components/PrimaryButton',
  component: PrimaryButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A primary action button component used for main CTAs and form submissions. Supports both standalone button behavior and form submission with formId association.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Button label text displayed inside the button',
      table: {
        type: { summary: 'string' },
      },
    },
    onButtonClick: {
      description: 'Callback function triggered when the button is clicked',
      table: {
        type: { summary: '() => void' },
      },
      action: 'button clicked',
    },
    buttonType: {
      control: 'select',
      options: ['button', 'submit'],
      description: 'HTML button type attribute',
      table: {
        type: { summary: "'button' | 'submit'" },
        defaultValue: { summary: "'button'" },
      },
    },
    formId: {
      control: 'text',
      description:
        'Optional form ID to associate the button with a form element',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
  },
  args: {
    name: 'Click Me',
    onButtonClick: fn(),
    buttonType: 'button',
    formId: undefined,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PrimaryButton>;

export const Default: Story = {
  args: {
    name: 'Primary Action',
    buttonType: 'button',
    onButtonClick: fn(),
  },
  play: playClickButton,
};

export const SubmitButton: Story = {
  args: {
    name: 'Submit',
    buttonType: 'submit',
    formId: 'example-form',
    onButtonClick: fn(),
  },
  play: playFormSubmit,
  decorators: [
    (Story) => (
      <form
        id="example-form"
        onSubmit={(e) => {
          e.preventDefault();
          console.log('Form submitted');
        }}
      >
        <Story />
      </form>
    ),
  ],
};

export const SaveButton: Story = {
  args: {
    name: 'Save Changes',
    buttonType: 'button',
    onButtonClick: fn(),
  },
  play: playKeyboardInteraction,
};

export const Interactive: Story = {
  args: {
    name: 'Confirm',
    buttonType: 'button',
    onButtonClick: fn(),
  },
  play: playMultipleClicks,
};
