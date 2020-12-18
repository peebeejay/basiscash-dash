import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Footer as FooterComponent } from '../components/Footer';

export default {
  title: 'Footer',
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 14vw;
  margin: ${rem(15)};
`;

export const footer = () => {
  return (
    <Container>
      <FooterComponent />
    </Container>
  );
};
