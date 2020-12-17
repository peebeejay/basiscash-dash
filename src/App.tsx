import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Dashboard } from './Dashboard';
import DashboardProvider from './DashboardProvider';

export const App = () => {
  const [hasWeb3, setHasWeb3] = useState(false);
  const [user, setUser] = useState(''); // the current connected user

  useEffect(() => {
    let isCancelled = false;

    async function updateUserInfo() {
      if (!isCancelled) {
        setHasWeb3(typeof (window as any).ethereum !== 'undefined');
      }
    }

    updateUserInfo();
    const id = setInterval(updateUserInfo, 15000);
    return () => {
      isCancelled = true;
      clearInterval(id);
    };
  }, [user]);

  return (
    <ThemeProvider theme={{}}>
      <DashboardProvider>{hasWeb3 && <Dashboard />}</DashboardProvider>
    </ThemeProvider>
  );
};
