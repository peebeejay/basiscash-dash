import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Navbar as NavbarComponent } from '../components/Navbar';

export default {
  title: 'Navbar',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 14vw;
  margin: ${rem(15)};
`;

export const navbar = () => {
  return (
    <Container>
      <NavbarComponent />
    </Container>
  );
};
