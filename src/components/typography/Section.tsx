import styled from 'styled-components';
import { rem } from 'polished';

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (max-width: ${rem(800)}) {
    margin-right: ${rem(20)};
    margin-left: ${rem(20)};
  }
`;

export const RowContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: ${rem(800)}) {
    flex-wrap: wrap;
  }
`;

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

export const LeftContainer = styled(SectionContainer)`
  margin-right: ${rem(30)};

  @media (max-width: ${rem(800)}) {
    margin-right: 0;
  }
`;

export const RightContainer = styled(SectionContainer)`
  margin-left: ${rem(30)};

  @media (max-width: ${rem(800)}) {
    margin-left: 0;
  }
`;
