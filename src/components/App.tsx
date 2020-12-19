import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { rem } from 'polished';
import { Dashboard } from './Dashboard';
import DashboardProvider from './DashboardProvider';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Helmet } from './Helmet';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Content = styled.main`
  width: ${rem(800)};
  font-family: 'PT Mono', monospace;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
`;

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
      <DashboardProvider>
        <Container>
          <Content>
            <Navbar />
            <Dashboard />
            <Footer />
          </Content>
        </Container>
      </DashboardProvider>
      <Helmet />
    </ThemeProvider>
  );
};
