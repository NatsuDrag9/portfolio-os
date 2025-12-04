import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import WindowContainer from './WindowContainer';
import { useWorkspaceState } from '@store/store';
import { WindowDisplayType } from '@definitions/applicationTypes';
import {
  playMinimizeWindow,
  playToggleMaximize,
  playCloseWindow,
  playInteractiveSequence,
  playDragWindow,
  playMultipleCycles,
  playRapidClicks,
  playStressTest,
} from './playFunctions';

// Helper to create window data for stories
const createWindowData = (
  windowId: string,
  title: string,
  isMaximized: WindowDisplayType = 'normal'
) => ({
  id: windowId,
  title,
  windowName: 'TestApp',
  isMaximized,
  previousDisplayState: 'normal' as const,
  position: { x: 50, y: 50 },
  zIndex: 1,
  size: { width: 450, height: 300 },
});

// Decorator to set up store with window data
const withWindowStore = (
  windowId: string,
  title: string,
  isMaximized: WindowDisplayType = 'normal'
) => {
  const StoreDecorator = (Story: React.ComponentType) => {
    useWorkspaceState.setState({
      activeWindows: [createWindowData(windowId, title, isMaximized)],
      windowInstanceCounters: { test: 1 },
    });
    return <Story />;
  };
  StoreDecorator.displayName = 'StoreDecorator';
  return StoreDecorator;
};

const meta: Meta<typeof WindowContainer> = {
  title: 'Components/WindowContainer',
  component: WindowContainer,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WindowContainer>;

// Normal state story
export const Normal: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This is window content in normal state.</p>
        <p>Click the buttons above to interact with the window.</p>
      </div>
    ),
  },
  decorators: [withWindowStore('test-window-1', 'Test Window', 'normal')],
};

// Maximized state story
export const Maximized: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This window is currently maximized.</p>
        <p>Click the maximize button again to restore to normal state.</p>
      </div>
    ),
  },
  decorators: [
    withWindowStore('test-window-1', 'Maximized Window', 'maximized'),
  ],
};

// Minimized state story
export const Minimized: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px' }}>
        <p>This window is minimized (hidden).</p>
      </div>
    ),
  },
  decorators: [
    withWindowStore('test-window-1', 'Minimized Window', 'minimized'),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'Window in minimized state - the container is hidden via CSS visibility.',
      },
    },
  },
};

// With custom title
export const CustomTitle: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Window with a custom title.</p>
      </div>
    ),
  },
  decorators: [
    withWindowStore('test-window-1', 'My Custom Application Title', 'normal'),
  ],
};

// Interactive story - click minimize button
export const InteractiveMinimize: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Click the minimize button (leftmost button in titlebar).</p>
      </div>
    ),
  },
  decorators: [
    withWindowStore('test-window-1', 'Interactive Minimize', 'normal'),
  ],
  play: playMinimizeWindow,
};

// Interactive story - toggle maximize
export const InteractiveMaximize: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Click the maximize button (middle button in titlebar).</p>
        <p>Click again to restore to normal.</p>
      </div>
    ),
  },
  decorators: [
    withWindowStore('test-window-1', 'Interactive Maximize', 'normal'),
  ],
  play: playToggleMaximize,
};

// Interactive story - close window
export const InteractiveClose: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Click the close button (rightmost button - X icon).</p>
      </div>
    ),
  },
  decorators: [withWindowStore('test-window-1', 'Interactive Close', 'normal')],
  play: playCloseWindow,
};

// Sequence of interactions
export const InteractiveSequence: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Watch the sequence of button clicks:</p>
        <ol>
          <li>Click minimize</li>
          <li>Click maximize</li>
          <li>Click maximize again to restore</li>
        </ol>
      </div>
    ),
  },
  decorators: [
    withWindowStore('test-window-1', 'Interactive Sequence', 'normal'),
  ],
  play: playInteractiveSequence,
};

// Story with long content
export const LongContent: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px', overflowY: 'scroll' }}>
        <h3>Window with Long Content</h3>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        ))}
      </div>
    ),
  },
  decorators: [
    withWindowStore('test-window-1', 'Long Content Window', 'normal'),
  ],
};

// Dragging story
export const InteractiveDrag: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Drag the window by its titlebar.</p>
        <p>Watch how the window moves across the screen.</p>
      </div>
    ),
  },
  decorators: [withWindowStore('test-window-1', 'Draggable Window', 'normal')],
  play: playDragWindow,
};

// Multiple cycles story
export const MultipleCycles: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Watch 3 complete cycles of minimize → maximize → restore</p>
      </div>
    ),
  },
  decorators: [withWindowStore('test-window-1', 'Multiple Cycles', 'normal')],
  play: playMultipleCycles,
};

// Rapid clicks story
export const RapidClicks: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Rapid button clicks: minimize → maximize → restore</p>
      </div>
    ),
  },
  decorators: [withWindowStore('test-window-1', 'Rapid Clicks', 'normal')],
  play: playRapidClicks,
};

// Stress test story
export const StressTest: Story = {
  args: {
    windowId: 'test-window-1',
    children: (
      <div style={{ padding: '20px' }}>
        <p>Stress test: rapid maximize and minimize cycles (5 iterations)</p>
      </div>
    ),
  },
  decorators: [withWindowStore('test-window-1', 'Stress Test', 'normal')],
  play: playStressTest,
};
