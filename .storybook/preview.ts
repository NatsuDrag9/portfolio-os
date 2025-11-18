import type { Preview } from '@storybook/react';

const preview: Preview = {
  parameters: {
    layout: 'centered', // Default layout for all stories
    viewport: {
      defaultViewport: 'responsive',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
