import styled from 'styled-components';
import { rem } from 'polished';

export const SmallHeader = styled.h4`
  color: ${({ theme }) => theme.headerColor};
  text-align: left;
  margin-bottom: ${rem(10)};
`;
