import { ChevronRightRegular } from '@fluentui/react-icons';
import StartMenuCategory from './StartMenuCategory';
import { APP_REGISTRY } from '@constants/desktopConstants';
import AppIcon from '@components/AppIcon/AppIcon';
import { useWorkspaceState } from '@store/store';
import { AppIconRightClickActionType } from '@definitions/desktopTypes';
import { AppIconVariant } from '@definitions/applicationTypes';
import { logInDev } from '@utils/logUtils';
import { useWindowManager } from '@hooks/useWindowManager';

export interface PanelOneProps {
  onButtonClick?: () => void;
}

function PanelOne({ onButtonClick }: PanelOneProps) {
  const { taskbarPinnedAppIds } = useWorkspaceState();
  const { launchWindow, closeWindow } = useWindowManager();

  const handleContextMenuClick = (
    appId: string,
    action: AppIconRightClickActionType,
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

  const DEFAULT_APPS = APP_REGISTRY.filter(
    (app) => app.startMenuAppCategory === 'default'
  );

  const RECOMMENDED_APPS = APP_REGISTRY.filter(
    (app) => app.startMenuAppCategory === 'recommended'
  );

  return (
    <div className="start-menu__panel-one">
      <div className="start-menu__default-apps-container">
        <StartMenuCategory
          title="Default"
          buttonProps={{
            icon: ChevronRightRegular,
            name: 'All',
            iconPosition: 'right',
            onButtonClick: onButtonClick,
          }}
        />
        <div className="start-menu__default-apps">
          {DEFAULT_APPS.map((app) => {
            const isPinned = Boolean(
              taskbarPinnedAppIds.find((id) => id === app.id)
            );
            return (
              <AppIcon
                key={app.id}
                appId={app.id}
                iconVariant="start-menu"
                isPinned={isPinned}
                onContextMenuItemClick={handleContextMenuClick}
                onSingleClick={launchWindow}
                onWindowClose={closeWindow}
              />
            );
          })}
        </div>
      </div>

      <div className="start-menu__recommended-apps-container">
        <StartMenuCategory title="Recommended" />

        <div className="start-menu__recommended-apps">
          {RECOMMENDED_APPS.map((app) => {
            const isPinned = Boolean(
              taskbarPinnedAppIds.find((id) => id === app.id)
            );
            return (
              <AppIcon
                key={app.id}
                appId={app.id}
                iconVariant="start-menu"
                isPinned={isPinned}
                onContextMenuItemClick={handleContextMenuClick}
                onSingleClick={launchWindow}
                onWindowClose={closeWindow}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PanelOne;
