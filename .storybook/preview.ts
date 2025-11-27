import type { Preview } from '@storybook/react';
import React from 'react';
import '../src/styles/main.scss';

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
  globalTypes: {
    theme: {
      description: 'Global theme for components',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme;
      const themeClass = theme === 'dark' ? 'dark-theme' : '';

      return React.createElement(
        'div',
        { className: `storybook-wrapper ${themeClass}` },
        React.createElement(Story)
      );
    },
  ],
};

export default preview;
