export interface PlayFunctionProps<TArgs = Record<string, unknown>> {
  canvasElement: HTMLElement;
  args?: TArgs;
}
