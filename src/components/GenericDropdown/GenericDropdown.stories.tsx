import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import GenericDropdown from './GenericDropdown';
import {
  playSelectOption,
  playKeyboardNavigation,
  playEscapeClose,
  playClickOutside,
} from './playFunctions';

const meta: Meta<typeof GenericDropdown> = {
  title: 'Components/GenericDropdown',
  component: GenericDropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fully accessible dropdown component with keyboard navigation support. Supports custom options, selection state, and disabled functionality. Follows ARIA best practices for combobox/listbox patterns.',
      },
    },
  },
  argTypes: {
    options: {
      control: 'object',
      description: 'Array of dropdown options with value and displayName',
      table: {
        type: { summary: 'DropdownType[]' },
      },
    },
    selectedOption: {
      control: 'object',
      description: 'Currently selected option object',
      table: {
        type: { summary: 'DropdownType' },
      },
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the dropdown',
      table: {
        type: { summary: 'string' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '"Select an option"' },
      },
    },
    onOptionSelect: {
      description: 'Callback function triggered when an option is selected',
      table: {
        type: { summary: '(selectedOption: DropdownType) => void' },
      },
      action: 'option selected',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the dropdown is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    options: [
      { value: '1', displayName: 'Option 1' },
      { value: '2', displayName: 'Option 2' },
      { value: '3', displayName: 'Option 3' },
    ],
    selectedOption: { value: '', displayName: '' },
    label: 'Select Option',
    placeholder: 'Select an option',
    onOptionSelect: fn(),
    isDisabled: false,
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GenericDropdown>;

export const Default: Story = {
  args: {
    options: [
      { value: 'react', displayName: 'React' },
      { value: 'vue', displayName: 'Vue' },
      { value: 'angular', displayName: 'Angular' },
      { value: 'svelte', displayName: 'Svelte' },
    ],
    selectedOption: { value: '', displayName: '' },
    label: 'Frontend Framework',
    placeholder: 'Choose a framework',
    isDisabled: false,
  },
  play: playSelectOption,
};

export const WithSelection: Story = {
  args: {
    options: [
      { value: 'india', displayName: 'India' },
      { value: 'usa', displayName: 'United States' },
      { value: 'uk', displayName: 'United Kingdom' },
      { value: 'canada', displayName: 'Canada' },
    ],
    selectedOption: { value: 'india', displayName: 'India' },
    label: 'Country',
    placeholder: 'Select a country',
    isDisabled: false,
  },
  play: playKeyboardNavigation,
};

export const Disabled: Story = {
  args: {
    options: [
      { value: 'small', displayName: 'Small' },
      { value: 'medium', displayName: 'Medium' },
      { value: 'large', displayName: 'Large' },
    ],
    selectedOption: { value: 'medium', displayName: 'Medium' },
    label: 'Size',
    placeholder: 'Select size',
    isDisabled: true,
  },
};

export const Interactive: Story = {
  args: {
    options: [
      { value: 'low', displayName: 'Low Priority' },
      { value: 'medium', displayName: 'Medium Priority' },
      { value: 'high', displayName: 'High Priority' },
      { value: 'urgent', displayName: 'Urgent' },
    ],
    selectedOption: { value: '', displayName: '' },
    label: 'Priority Level',
    placeholder: 'Set priority',
    isDisabled: false,
  },
  play: async ({ canvasElement, args }) => {
    await playEscapeClose({ canvasElement, args });
    await playClickOutside({ canvasElement, args });
  },
};
