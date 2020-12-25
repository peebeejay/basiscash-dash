import styled from 'styled-components';
import { rem } from 'polished';

export const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: ${rem(10)};
  flex: 1;

  @media (max-width: ${rem(800)}) {
    flex: 100%;
  }
`;

export const RightContainer = styled(SectionContainer)`
  margin-right: ${rem(30)};

  @media (max-width: ${rem(800)}) {
    margin-right: 0;
  }
`;

export const LeftContainer = styled(SectionContainer)`
  margin-left: ${rem(30)};

  @media (max-width: ${rem(800)}) {
    margin-left: 0;
  }
`;
