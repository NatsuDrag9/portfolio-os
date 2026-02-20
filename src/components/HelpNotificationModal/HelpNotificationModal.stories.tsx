import type { Meta, StoryObj } from '@storybook/react';
import HelpNotificationModal from './HelpNotificationModal';

const meta: Meta<typeof HelpNotificationModal> = {
  title: 'Components/HelpNotificationModal',
  component: HelpNotificationModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A Windows 11 Hello-style help notification modal that guides recruiters to the Portfolio icon. Appears on desktop after login with a welcoming message and quick navigation guide. Features a dismissible overlay modal with smooth animations and Fluent Design styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      description:
        'Controls whether the modal is visible. When true, displays the help notification; when false, the modal is hidden.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
        category: 'Props',
      },
      control: 'boolean',
    },
    onDismiss: {
      description:
        'Callback function triggered when the user dismisses the modal by clicking the close button, dismiss button, or overlay.',
      table: {
        type: { summary: '() => void' },
        defaultValue: { summary: 'required' },
        category: 'Props',
      },
      control: false,
    },
  },
};

export default meta;
type Story = StoryObj<typeof HelpNotificationModal>;

export const Open: Story = {
  args: {
    isOpen: true,
    onDismiss: () => alert('Help notification dismissed!'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'HelpNotificationModal in open state. Displays a welcoming message with the Portfolio icon, quick navigation guide, and dismiss options. The modal appears on top of a semi-transparent backdrop with blur effect.',
      },
    },
  },
};

export const Closed: Story = {
  args: {
    isOpen: false,
    onDismiss: () => alert('Help notification dismissed!'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'HelpNotificationModal in closed state. When isOpen is false, the modal is not rendered. This is typically used when the user has already dismissed the notification during the current session.',
      },
    },
  },
};

// export const Interactive: Story = {
//   render: () => {
//     const [isOpen, setIsOpen] = useState(true);

//     return (
//       <div>
//         <HelpNotificationModal
//           isOpen={isOpen}
//           onDismiss={() => setIsOpen(false)}
//         />
//         <div
//           style={{
//             padding: '2rem',
//             textAlign: 'center',
//             background: 'var(--color-neutral-background2)',
//             minHeight: '100vh',
//             fontFamily: 'var(--font-family-base)',
//           }}
//         >
//           <h2 style={{ color: 'var(--color-neutral-foreground1)' }}>
//             Help Notification Modal Demo
//           </h2>
//           <p style={{ color: 'var(--color-neutral-foreground2)' }}>
//             {isOpen
//               ? 'Modal is currently open. Click "Got it, let\'s go!" or the X button to dismiss it.'
//               : 'Modal is currently closed. The notification has been dismissed.'}
//           </p>
//           {!isOpen && (
//             <button
//               onClick={() => setIsOpen(true)}
//               style={{
//                 padding: '0.75rem 1.5rem',
//                 background: 'var(--color-brand-background)',
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '0.375rem',
//                 cursor: 'pointer',
//                 fontSize: '1rem',
//                 fontWeight: '600',
//               }}
//             >
//               Reopen Modal
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   },
//   parameters: {
//     docs: {
//       description: {
//         story:
//           'Interactive demo of the HelpNotificationModal with state management. Click the dismiss button or close button to see the modal hide. Use the "Reopen Modal" button to display it again. This simulates how the modal behaves in the actual Workspace component.',
//       },
//     },
//   },
// };

export const WithDarkTheme: Story = {
  args: {
    isOpen: true,
    onDismiss: () => alert('Help notification dismissed!'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'HelpNotificationModal displayed with dark theme styling. The modal adapts to the dark theme with appropriate color adjustments while maintaining the Fluent Design aesthetic and brand color consistency.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div
        className="dark-theme"
        style={{ minHeight: '100vh', padding: '1rem' }}
      >
        <Story />
      </div>
    ),
  ],
};

export const MobileViewport: Story = {
  args: {
    isOpen: true,
    onDismiss: () => alert('Help notification dismissed!'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
    docs: {
      description: {
        story:
          'HelpNotificationModal on mobile viewport. The modal is responsive and adjusts padding, font sizes, and layout for smaller screens. The grid layout converts to single column on mobile devices.',
      },
    },
  },
};
