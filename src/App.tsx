import {
  BootScreen,
  Desktop,
  LoginScreen,
  PowerOffScreen,
} from '@components/screens';
import { useAuth, useBootStatus } from '@store/store';
import '@styles/main.scss';
import { logInDev } from '@utils/logUtils';
import { useEffect } from 'react';

function App() {
  const { bootStatus } = useBootStatus();

  // To Do: Remove this useEffect after development
  useEffect(() => {
    // Subscribe to useBootStatus store
    const unsubscribeBootStatus = useBootStatus.subscribe((state) => {
      logInDev('Boot Status Store:', state);
    });

    // Subscribe to useAuth store
    const unsubscribeAuth = useAuth.subscribe((state) => {
      logInDev('Auth Store:', state);
    });

    // Cleanup subscriptions on unmount
    return () => {
      unsubscribeBootStatus();
      unsubscribeAuth();
    };
  }, []);

  const renderScreen = () => {
    if (bootStatus === 'ON') {
      return <Desktop />;
    }
    if (bootStatus === 'OFF') {
      return <PowerOffScreen />;
    }

    if (bootStatus === 'DISPLAY_LOGIN_SCREEN') {
      return <LoginScreen />;
    }

    return <BootScreen />;
  };

  return <div className="app">{renderScreen()}</div>;
}

export default App;
