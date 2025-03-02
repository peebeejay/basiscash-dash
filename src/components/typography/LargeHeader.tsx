import styled from 'styled-components';
import { rem } from 'polished';

export const LargeHeader = styled.h2`
  transition: 250ms color ease;
  color: ${({ theme }) => theme.headerColor};
  text-align: left;
  margin-bottom: ${rem(10)};
  margin-top: ${rem(10)};
  font-size: ${rem(24)};
  font-weight: 700;

  @media (max-width: ${rem(800)}) {
    font-size: ${rem(20)};
  }
`;
