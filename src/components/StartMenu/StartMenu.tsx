import './StartMenu.scss';
import { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import StartMenuUser from './StartMenuUser';
import StartMenuPowerButton from './StartMenuPowerButton';
import { useSystemUIState, useWorkspaceState } from '@store/store';
import useClickOutsideModal from '@hooks/useClickOutsideModal';
import PanelSearchResults from './Panels/PanelSearchResults';
import PanelOne from './Panels/PanelOne';
import PanelTwo from './Panels/PanelTwo';

type StartMenuPanelType = 'panel-one' | 'panel-two' | 'search-results';

function StartMenu() {
  const startMenuRef = useRef<HTMLDivElement>(null);
  const windowsButtonRef = useRef<HTMLElement | null>(null);
  const [changePanel, setChangePanel] =
    useState<StartMenuPanelType>('panel-one');
  const {
    startMenuOpen,
    setStartMenuOpen,
    searchValue,
    setSearchValue,
    taskbarAlignment,
  } = useSystemUIState();
  const { activeWindows } = useWorkspaceState();

  // Get reference to Windows button in Taskbar via data attribute
  useEffect(() => {
    const windowsButton = document.querySelector('[data-start-menu-trigger]');
    if (windowsButton) {
      windowsButtonRef.current = windowsButton as HTMLElement;
    }
  }, []);

  // Close start menu when clicking outside
  useClickOutsideModal(
    startMenuOpen,
    () => {
      if (searchValue) {
        setSearchValue('');
      }
      setStartMenuOpen(false);
    },
    startMenuRef as RefObject<HTMLElement>,
    [windowsButtonRef as RefObject<HTMLElement>]
  );

  // Compute z-index to be higher than all active windows
  const startMenuZIndex = useMemo(() => {
    if (activeWindows.length === 0) return 1000;
    const maxZIndex = Math.max(...activeWindows.map((w) => w.zIndex));
    return maxZIndex + 1;
  }, [activeWindows]);

  // Determine active panel based on search value
  const activePanel = useMemo<StartMenuPanelType>(() => {
    if (searchValue.trim()) {
      return 'search-results';
    }
    return changePanel === 'search-results' ? 'panel-one' : changePanel;
  }, [searchValue, changePanel]);

  const handleBackToMain = () => {
    setSearchValue('');
    setChangePanel('panel-one');
  };

  return (
    <div
      className={`start-menu ${activePanel} ${taskbarAlignment} ${startMenuOpen ? 'open' : ''}`}
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

      <PanelSearchResults
        searchValue={searchValue}
        onButtonClick={handleBackToMain}
      />

      <div className="start-menu__bottom">
        <StartMenuUser />
        <StartMenuPowerButton />
      </div>
    </div>
  );
}

export default StartMenu;
