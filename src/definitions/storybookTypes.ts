import { StoryContext } from '@storybook/react';

export interface PlayFunctionProps<TArgs = Record<string, unknown>> {
  canvasElement: HTMLElement;
  args?: TArgs;
}

// For components which don't have props and use the zustand store internally
export type PlayFunctionType = Pick<StoryContext, 'canvasElement'>;
