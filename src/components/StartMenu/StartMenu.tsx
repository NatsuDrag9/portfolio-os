import './StartMenu.scss';
import { RefObject, useMemo, useRef, useState } from 'react';
import PanelOne from './PanelOne';
import StartMenuUser from './StartMenuUser';
import PanelTwo from './PanelTwo';
import StartMenuPowerButton from './StartMenuPowerButton';
import { useSystemUIState, useWorkspaceState } from '@store/store';
import useClickOutsideModal from '@hooks/useClickOutsideModal';

type StartMenuPanelType = 'panel-one' | 'panel-two';

function StartMenu() {
  const startMenuRef = useRef<HTMLDivElement>(null);
  const [changePanel, setChangePanel] =
    useState<StartMenuPanelType>('panel-one');
  const { startMenuOpen, setStartMenuOpen } = useSystemUIState();
  const { activeWindows } = useWorkspaceState();

  // Close start menu when clicking outside
  useClickOutsideModal(
    startMenuOpen,
    () => setStartMenuOpen(false),
    startMenuRef as RefObject<HTMLElement>
  );

  // Compute z-index to be higher than all active windows
  const startMenuZIndex = useMemo(() => {
    if (activeWindows.length === 0) return 1000;
    const maxZIndex = Math.max(...activeWindows.map((w) => w.zIndex));
    return maxZIndex + 1;
  }, [activeWindows]);

  return (
    <div
      className={`start-menu ${changePanel} ${startMenuOpen ? 'open' : 'close'}`}
      style={{ zIndex: startMenuZIndex }}
      ref={startMenuRef}
    >
      <PanelOne
        onButtonClick={() => {
          setChangePanel('panel-two');
        }}
      />

      <PanelTwo
        onButtonClick={() => {
          setChangePanel('panel-one');
        }}
      />

      <div className="start-menu__bottom">
        <StartMenuUser />
        <StartMenuPowerButton />
      </div>
    </div>
  );
}

export default StartMenu;
