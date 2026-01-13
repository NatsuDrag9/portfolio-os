import type { Meta, StoryObj } from '@storybook/react';
import PortfolioNavbar from './PortfolioNavbar';
import {
  basicNavbarPlay,
  activeStatePlay,
  clickInteractionPlay,
  keyboardNavigationPlay,
} from './playFunctions';
import {
  HomeRegular,
  DocumentRegular,
  CodeRegular,
  BriefcaseRegular,
  PersonRegular,
  BuildingRegular,
  MailRegular,
} from '@fluentui/react-icons';

const meta: Meta<typeof PortfolioNavbar> = {
  title: 'Components/PortfolioNavbar',
  component: PortfolioNavbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A horizontal navigation bar component with icon/image support for each button. Supports both Fluent UI icons (as React components) and traditional image URLs. Features active state management and click interactions. Commonly used for section navigation, tab switching, or filtering content in portfolio or dashboard interfaces.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    buttons: {
      description:
        'Array of button configuration objects. Each button has a name, icon/image, click handler, unique ID, and active state.',
      table: {
        type: {
          summary: 'ButtonDetailProps[]',
          detail: `Array<{
  name: string;
  onButtonClick: (id: string | number) => void;
  id: string | number;
  isActive: boolean;
  image: ComponentType<{ className?: string }> | string;
}>`,
        },
        defaultValue: { summary: 'required' },
        category: 'Props',
      },
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PortfolioNavbar>;

// Sample button data with Fluent icons
const sampleButtons = [
  {
    id: 1,
    name: 'Overview',
    image: HomeRegular,
    isActive: true,
    onButtonClick: (id: string | number) => console.log('Clicked:', id),
  },
  {
    id: 2,
    name: 'Projects',
    image: DocumentRegular,
    isActive: false,
    onButtonClick: (id: string | number) => console.log('Clicked:', id),
  },
  {
    id: 3,
    name: 'Skills',
    image: CodeRegular,
    isActive: false,
    onButtonClick: (id: string | number) => console.log('Clicked:', id),
  },
  {
    id: 4,
    name: 'Experience',
    image: BriefcaseRegular,
    isActive: false,
    onButtonClick: (id: string | number) => console.log('Clicked:', id),
  },
];

export const Default: Story = {
  args: {
    buttons: sampleButtons,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Default portfolio navbar with four navigation buttons. The first button (Overview) is active by default.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  play: basicNavbarPlay,
};

export const DifferentActiveState: Story = {
  args: {
    buttons: [
      {
        id: 1,
        name: 'Overview',
        image: HomeRegular,
        isActive: false,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
      {
        id: 2,
        name: 'Projects',
        image: DocumentRegular,
        isActive: false,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
      {
        id: 3,
        name: 'Skills',
        image: CodeRegular,
        isActive: true,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
      {
        id: 4,
        name: 'Experience',
        image: BriefcaseRegular,
        isActive: false,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Navbar with a different active button (Skills). Demonstrates active state styling on the third button with icon support.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  play: activeStatePlay,
};

export const WithClickInteraction: Story = {
  args: {
    buttons: sampleButtons,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive navbar demonstrating click behavior. Play function simulates clicking buttons and verifies the click handlers are called.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  play: clickInteractionPlay,
};

export const ManyButtons: Story = {
  args: {
    buttons: [
      {
        id: 'home',
        name: 'Home',
        image: HomeRegular,
        isActive: true,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
      {
        id: 'about',
        name: 'About',
        image: PersonRegular,
        isActive: false,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
      {
        id: 'services',
        name: 'Services',
        image: BuildingRegular,
        isActive: false,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
      {
        id: 'portfolio',
        name: 'Portfolio',
        image: DocumentRegular,
        isActive: false,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
      {
        id: 'blog',
        name: 'Blog',
        image: CodeRegular,
        isActive: false,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
      {
        id: 'contact',
        name: 'Contact',
        image: MailRegular,
        isActive: false,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Navbar with six buttons and corresponding Fluent UI icons to demonstrate layout with more navigation items. Uses string IDs instead of numbers.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '800px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
  play: keyboardNavigationPlay,
};

export const MobileView: Story = {
  args: {
    buttons: [
      {
        id: 'home',
        name: 'Home',
        image: HomeRegular,
        isActive: true,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
      {
        id: 'about',
        name: 'About',
        image: PersonRegular,
        isActive: false,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
      {
        id: 'portfolio',
        name: 'Portfolio',
        image: DocumentRegular,
        isActive: false,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
      {
        id: 'contact',
        name: 'Contact',
        image: MailRegular,
        isActive: false,
        onButtonClick: (id: string | number) => console.log('Clicked:', id),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Mobile view with multiple buttons showing how the navbar adapts. Active button (Home) displays both icon and name, while inactive buttons show only icons for space efficiency.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};
