import type { Meta, StoryObj } from '@storybook/react';
import DisplayCard from './DisplayCard';
import {
  PersonRegular,
  MailRegular,
  CalendarRegular,
  LocationRegular,
  PhoneRegular,
  BuildingRegular,
} from '@fluentui/react-icons';

const meta: Meta<typeof DisplayCard> = {
  title: 'Components/DisplayCard',
  component: DisplayCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A versatile display card component that shows an icon/image alongside a label and content. Supports both Fluent UI icons (as React components) and traditional image URLs. Content can be rendered as plain text, clickable email links, or external links. Commonly used for user profiles, contact information, or data display in sidebar.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    image: {
      description:
        'Icon or image to display. Can be either a Fluent UI icon component or an image URL string.',
      table: {
        type: {
          summary: 'string | ComponentType<{ className: string }>',
          detail: `Union type that accepts:
- string: Image URL or path
- ComponentType: Fluent UI icon component`,
        },
        defaultValue: { summary: 'required' },
        category: 'Props',
      },
      control: false, // Disable control since it's complex type
    },
    label: {
      description:
        'Label text displayed above the content. Typically describes the type of information shown.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'required' },
        category: 'Props',
      },
      control: 'text',
    },
    content: {
      description:
        'Main content text to display. The primary information shown to the user.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'required' },
        category: 'Props',
      },
      control: 'text',
    },
    contentType: {
      description:
        'Type of content to render. Determines how the content is displayed and whether it\'s interactive. "email" creates a mailto link, "link" creates an external link with noopener noreferrer, or leave undefined for plain text.',
      table: {
        type: { summary: '"email" | "link" | string' },
        defaultValue: { summary: 'undefined' },
        category: 'Props',
      },
      control: {
        type: 'select',
        options: [undefined, 'email', 'link'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DisplayCard>;

export const WithFluentIcon: Story = {
  args: {
    image: PersonRegular,
    label: 'Username',
    content: 'Admin',
  },
  parameters: {
    docs: {
      description: {
        story:
          'DisplayCard using a Fluent UI icon component with plain text content. The icon is rendered as an SVG with proper styling and accessibility.',
      },
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

export const WithEmailLink: Story = {
  args: {
    image: MailRegular,
    label: 'Email',
    content: 'admin@savart.com',
    contentType: 'email',
  },
  parameters: {
    docs: {
      description: {
        story:
          "DisplayCard with email content type. The content is rendered as a clickable mailto link that opens the user's default email client when clicked.",
      },
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

export const WithExternalLink: Story = {
  args: {
    image: BuildingRegular,
    label: 'Website',
    content: 'https://savart.com',
    contentType: 'link',
  },
  parameters: {
    docs: {
      description: {
        story:
          'DisplayCard with link content type. The content is rendered as a clickable external link that opens in a new tab with proper security attributes (target="_blank" rel="noopener noreferrer").',
      },
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

export const MixedContentTypes: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <DisplayCard
        image={PersonRegular}
        label="Full Name"
        content="Rohit Kumar"
      />
      <DisplayCard
        image={MailRegular}
        label="Email"
        content="rohit@savart.com"
        contentType="email"
      />
      <DisplayCard
        image={PhoneRegular}
        label="Phone"
        content="+91 98765 43210"
      />
      <DisplayCard
        image={BuildingRegular}
        label="Company Website"
        content="https://savart.com"
        contentType="link"
      />
      <DisplayCard
        image={LocationRegular}
        label="Location"
        content="Hyderabad, India"
      />
      <DisplayCard
        image={CalendarRegular}
        label="Joined"
        content="January 2024"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Demonstration of multiple DisplayCards with different content types: plain text (name, phone, location, joined date), email link (opens email client), and external link (opens website). This pattern is common in user profiles and contact information panels where some fields are interactive while others are static.',
      },
    },
  },
};
