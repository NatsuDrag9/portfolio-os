import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ImagePicker from './ImagePicker';
import { BACKGROUND_IMAGE_MAP } from '@constants/settingsConstants';
import {
  playSelectImage,
  playSelectMultipleImages,
  playKeyboardSelection,
  playVerifySelectedState,
} from './playFunctions';

const meta: Meta<typeof ImagePicker> = {
  title: 'Components/ImagePicker',
  component: ImagePicker,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An accessible image picker component that displays a preview of the selected image and a grid of thumbnail options.',
      },
    },
  },
  argTypes: {
    selectedImage: {
      control: 'object',
      description:
        'Currently selected background image object with name and image URL',
      table: {
        type: {
          summary: 'BackgroundImageMap',
          detail: '{ name: string; image: string }',
        },
      },
    },
    onImageClick: {
      description: 'Callback function triggered when an image is clicked',
      table: {
        type: { summary: '(name: BackgroundImageMap) => void' },
      },
      action: 'image selected',
    },
    title: {
      control: 'text',
      description: 'Title text displayed above the image grid',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    selectedImage: Object.values(BACKGROUND_IMAGE_MAP)[0],
    onImageClick: fn(),
    title: 'Background Image',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ImagePicker>;

export const Default: Story = {
  args: {
    selectedImage: Object.values(BACKGROUND_IMAGE_MAP)[0],
    title: 'Choose Background',
    onImageClick: fn(),
  },
  play: playSelectImage,
};

export const WithCustomTitle: Story = {
  args: {
    selectedImage: Object.values(BACKGROUND_IMAGE_MAP)[2],
    title: 'Desktop Wallpaper',
    onImageClick: fn(),
  },
  play: playSelectMultipleImages,
};

export const PreSelected: Story = {
  args: {
    selectedImage: Object.values(BACKGROUND_IMAGE_MAP)[3],
    title: 'Theme Background',
    onImageClick: fn(),
  },
  play: playVerifySelectedState,
};

export const Interactive: Story = {
  args: {
    selectedImage: Object.values(BACKGROUND_IMAGE_MAP)[0],
    title: 'Select Your Favorite',
    onImageClick: fn(),
  },
  play: playKeyboardSelection,
};
