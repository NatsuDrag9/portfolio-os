import { useWorkspaceState } from '@store/store';
import WindowContainer from '@components/WindowContainer/WindowContainer';
import { Settings } from '@apps/default';

function WindowManager() {
  const { activeWindows } = useWorkspaceState();

  const renderWindowContent = (windowName: string, windowId: string) => {
    switch (windowName) {
      case 'Settings':
        return <Settings key={windowId} />;
      // Add more window mappings here as needed
      default:
        return null;
    }
  };

  return (
    <>
      {activeWindows
        .filter(
          (
            window
          ): window is typeof window & { id: string; windowName: string } =>
            !!window.id && !!window.windowName
        )
        .map((window) => {
          const content = renderWindowContent(window.windowName, window.id);

          // Only render if content exists
          if (!content) return null;

          return (
            <WindowContainer key={window.id} windowId={window.id}>
              {content}
            </WindowContainer>
          );
        })}
    </>
  );
}

export default WindowManager;
