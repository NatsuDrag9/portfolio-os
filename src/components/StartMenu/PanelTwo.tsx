import { ChevronLeftRegular } from '@fluentui/react-icons';
import StartMenuCategory from './StartMenuCategory';
import { APP_REGISTRY } from '@constants/desktopConstants';
import { useWorkspaceState } from '@store/store';
import AppIcon from '@components/AppIcon/AppIcon';
import { useWindowManager } from '@hooks/useWindowManager';
import { RightClickActionType } from '@definitions/desktopTypes';
import { AppIconVariant, AppMetadata } from '@definitions/applicationTypes';
import { logInDev } from '@utils/logUtils';
import { useMemo } from 'react';

export interface PanelTwoProps {
  onButtonClick?: () => void;
}

function PanelTwo({ onButtonClick }: PanelTwoProps) {
  const { taskbarPinnedAppIds } = useWorkspaceState();
  const { launchWindow, closeWindow } = useWindowManager();

  const handleContextMenuClick = (
    appId: string,
    action: RightClickActionType,
    variant: AppIconVariant
  ) => {
    logInDev(
      'Right click: ',
      'appId: ',
      appId,
      'action: ',
      action,
      'variant: ',
      variant
    );
  };

  const groupAppsByFirstLetter = (
    apps: AppMetadata[]
  ): Record<string, AppMetadata[]> => {
    const grouped = apps.reduce(
      (acc, app) => {
        const firstLetter = app.appName.charAt(0).toUpperCase();
        if (!acc[firstLetter]) {
          // NOTE: Assignment to the accumulator is necesssary here
          // eslint-disable-next-line no-param-reassign
          acc[firstLetter] = [];
        }
        acc[firstLetter].push(app);
        return acc;
      },
      {} as Record<string, AppMetadata[]>
    );

    // Sort alphabetically and sort apps within each group
    return Object.keys(grouped)
      .sort()
      .reduce(
        (acc, letter) => {
          // NOTE: Assignment to the accumulator is necesssary here
          // eslint-disable-next-line no-param-reassign
          acc[letter] = grouped[letter].sort((a, b) =>
            a.appName.localeCompare(b.appName)
          );
          return acc;
        },
        {} as Record<string, AppMetadata[]>
      );
  };
  const groupedApps = useMemo(() => groupAppsByFirstLetter(APP_REGISTRY), []);

  return (
    <div className="start-menu__panel-two">
      <StartMenuCategory
        title="All"
        buttonProps={{
          icon: ChevronLeftRegular,
          name: 'Back',
          iconPosition: 'left',
          onButtonClick: onButtonClick,
        }}
      />

      <div className="start-menu__all-apps-container">
        {Object.entries(groupedApps).map(([letter, apps]) => (
          <div key={letter} className="start-menu__letter-group">
            <h6 className="start-menu__letter-heading">{letter}</h6>
            <div className="start-menu__letter-apps">
              {apps.map((app) => {
                const isPinned = Boolean(
                  taskbarPinnedAppIds.find((id) => id === app.id)
                );
                return (
                  <div className="start-menu__letter-app" key={app.id}>
                    <AppIcon
                      key={app.id}
                      appId={app.id}
                      iconVariant="taskbar"
                      isPinned={isPinned}
                      onContextMenuItemClick={handleContextMenuClick}
                      onSingleClick={launchWindow}
                      onWindowClose={closeWindow}
                    />
                    <p className="start-menu__letter-app-name">{app.appName}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PanelTwo;
