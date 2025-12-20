import { ArrowLeftFilled, SearchRegular } from '@fluentui/react-icons';
import { APP_REGISTRY } from '@constants/desktopConstants';
import AppIcon from '@components/AppIcon/AppIcon';
import { useWorkspaceState } from '@store/store';
import { useWindowManager } from '@hooks/useWindowManager';

export interface PanelSearchResultsProps {
  searchValue: string;
  onButtonClick?: () => void;
}

function PanelSearchResults({
  searchValue,
  onButtonClick,
}: PanelSearchResultsProps) {
  const { taskbarPinnedAppIds } = useWorkspaceState();
  const { launchWindow, closeWindow } = useWindowManager();

  // Filter apps based on search value
  const filteredApps = searchValue.trim()
    ? APP_REGISTRY.filter((app) =>
        app.appName.toLowerCase().includes(searchValue.toLowerCase())
      )
    : [];

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
                onSingleClick={launchWindow}
                onWindowClose={closeWindow}
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
