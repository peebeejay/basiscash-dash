import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ThemeProvider } from './ThemeProvider';
import { Dashboard } from './Dashboard';
import DashboardProvider from './DashboardProvider';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition: 250ms background-color ease;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

const Content = styled.main`
  width: ${rem(800)};
  font-family: 'PT Mono', monospace;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;

  @media (max-width: ${rem(800)}) {
    width: 100%;
  }
`;

export const App = () => {
  return (
    <ThemeProvider>
      <DashboardProvider>
        <Container>
          <Content>
            <Navbar />
            <Dashboard />
            <Footer />
          </Content>
        </Container>
      </DashboardProvider>
    </ThemeProvider>
  );
};
