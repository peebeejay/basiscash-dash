import styled from 'styled-components';
import { rem } from 'polished';

export const SmallHeader = styled.h4`
  transition: 250ms color ease;
  color: ${({ theme }) => theme.headerColor};
  text-align: left;
  margin-bottom: ${rem(10)};

  @media (max-width: ${rem(800)}) {
    font-size: ${rem(18)};
  }
`;
