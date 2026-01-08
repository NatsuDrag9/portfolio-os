import { ArrowLeftFilled, SearchRegular } from '@fluentui/react-icons';
import './Panels.scss';
import { APP_REGISTRY } from '@constants/desktopConstants';
import AppIcon from '@components/AppIcon/AppIcon';
import { useWorkspaceState } from '@store/store';
import { useWindowManager } from '@hooks/useWindowManager';
import { AppIconRightClickActionType } from '@definitions/desktopTypes';
import { AppIconVariant } from '@definitions/applicationTypes';
import { logInDev } from '@utils/logUtils';

export interface PanelSearchResultsProps {
  searchValue: string;
  onButtonClick?: () => void;
  onAppLaunch: () => void;
}

function PanelSearchResults({
  searchValue,
  onButtonClick,
  onAppLaunch,
}: PanelSearchResultsProps) {
  const { taskbarPinnedAppIds, togglePin } = useWorkspaceState();
  const { launchWindow, closeWindow } = useWindowManager();

  // Filter apps based on search value
  const filteredApps = searchValue.trim()
    ? APP_REGISTRY.filter((app) =>
        app.appName.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

  const handleContextMenuClick = (
    appId: string,
    action: AppIconRightClickActionType,
    _variant: AppIconVariant
  ) => {
    logInDev('Called context menu callback');
    switch (action) {
      case 'new-window':
        launchWindow(appId);
        break;
      case 'pin-to-taskbar':
      case 'unpin-from-taskbar':
        togglePin(appId);
        break;
      default:
        break;
    }
  };

  return (
    <div className="start-menu__search-results">
      <button
        className="start-menu__back"
        type="button"
        onClick={onButtonClick}
        aria-label="Back to main menu"
      >
        <ArrowLeftFilled className="start-menu__fluent-icon" />
      </button>
      <h4 className="start-menu__category-title">
        {filteredApps.length > 0 ? 'Best Match' : 'Search Results'}
      </h4>

      <div className="start-menu__results-container">
        {filteredApps.length > 0 ? (
          filteredApps.map((app) => {
            const isPinned = taskbarPinnedAppIds.includes(app.id);
            return (
              <AppIcon
                key={app.id}
                appId={app.id}
                iconVariant="start-menu"
                isPinned={isPinned}
                onSingleClick={(appId: string) => {
                  launchWindow(appId);
                  // Close start menu
                  onAppLaunch();
                }}
                onWindowClose={closeWindow}
                onContextMenuItemClick={handleContextMenuClick}
              />
            );
          })
        ) : (
          <div className="start-menu__no-results">
            <SearchRegular className="start-menu__no-results-icon" />
            <p className="start-menu__no-results-text">
              No apps found for &ldquo;{searchValue}&rdquo;
            </p>
            <p className="start-menu__no-results-hint">
              Try searching with a different term
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PanelSearchResults;
