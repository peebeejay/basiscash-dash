import styled from 'styled-components';
import { rem } from 'polished';

export const ListItem = styled.div`
  transition: 250ms color ease;
  color: ${({ theme }) => theme.textColor};
  font-size: ${rem(20)};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
  width: 100%;
  margin-bottom: ${rem(10)};

  @media (max-width: ${rem(800)}) {
    font-size: ${rem(16)};
  }
`;

export const Name = styled.div``;

export const Value = styled.div``;
