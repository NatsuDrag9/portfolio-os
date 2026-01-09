import { useBootStatus, useSystemUIState } from '@store/store';
import { useMemo } from 'react';
import '@styles/main.scss';
import {
  BootScreen,
  Workspace,
  LoginScreen,
  PowerOffScreen,
  ShutdownScreen,
} from './screens';
import { Portfolio } from '@apps/default/';

function App() {
  const { bootStatus } = useBootStatus();
  const { currentTheme } = useSystemUIState();

  // Check if current URL is /portfolio
  const isPortfolioRoute = useMemo(
    () => window.location.pathname.endsWith('/portfolio'),
    []
  );

  // // To Do: Remove this useEffect after development
  // useEffect(() => {
  //   // Subscribe to useBootStatus store
  //   const unsubscribeBootStatus = useBootStatus.subscribe((state) => {
  //     logInDev('Boot Status Store:', state);
  //   });

  //   // Subscribe to useAuth store
  //   const unsubscribeAuth = useAuth.subscribe((state) => {
  //     logInDev('Auth Store:', state);
  //   });

  //   // Cleanup subscriptions on unmount
  //   return () => {
  //     unsubscribeBootStatus();
  //     unsubscribeAuth();
  //   };
  // }, []);

  const renderScreen = () => {
    // Render Portfolio component for /portfolio route
    if (isPortfolioRoute) {
      return <Portfolio />;
    }

    if (bootStatus === 'ON') {
      return <Workspace />;
    }
    if (bootStatus === 'OFF') {
      return <PowerOffScreen />;
    }

    if (bootStatus === 'DISPLAY_LOGIN_SCREEN') {
      return <LoginScreen />;
    }

    if (bootStatus === 'DISPLAY_SHUTDOWN_SCREEN') {
      return <ShutdownScreen />;
    }

    return <BootScreen />;
  };

  // Apply dark-theme class when currentTheme is 'dark' for CSS variable switching
  const themeClass = currentTheme === 'dark' ? 'dark-theme' : '';

  return <div className={`app ${themeClass}`}>{renderScreen()}</div>;
}

export default App;
