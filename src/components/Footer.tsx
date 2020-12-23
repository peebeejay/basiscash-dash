import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { rem } from 'polished';
import { ThemeDispatchContext } from './ThemeProvider';
import { ThemeNames } from '../theme';
import Tooltip from '@material-ui/core/Tooltip';

const Container = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${rem(10)};
  font-size: ${rem(14)};
  line-height: ${rem(16)};
`;

const MadeBy = styled.div`
  transition: 250ms color ease;
  color: ${({ theme }) => theme.textColor};
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  letter-spacing: -0.3px;
  font-weight: 700;

  @media (max-width: ${rem(600)}) {
    display: none;
  }
`;

const Link = styled.a`
  color: ${({ theme }) => theme.textColor};
  text-decoration: none;
  transition: 250ms color ease;

  &:not(:last-child) {
    margin-right: ${rem(10)};
  }

  &:hover {
    color: ${({ theme }) => theme.headerColor};
  }
`;

const Mode = styled.div`
  color: ${({ theme }) => theme.textColor};
  transition: 250ms color ease;
  min-width: ${rem(110)};

  &:hover {
    color: ${({ theme }) => theme.headerColor};
    cursor: pointer;
  }
`;

const Divider = styled.div`
  transition: 250ms color ease;
  color: ${({ theme }) => theme.textColor};
  font-size: ${rem(16)};
  margin: 0 ${rem(5)};
`;

const NameLink = styled.a`
  color: ${({ theme }) => theme.textColor};
  transition: 250ms color ease;

  &:hover {
    color: ${({ theme }) => theme.headerColor};
  }
`;

const TipContent = styled.span`
  font-size: ${rem(12)};
  font-weight: 600;
`;

export const Footer = () => {
  const dispatch = useContext(ThemeDispatchContext);
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <MadeBy>
        {'made by '}
        <Tooltip
          title={<TipContent>{'Contact via Discord or saitama@jay.gg'}</TipContent>}
        >
          <b>
            <NameLink href="https://discordapp.com/users/427289104682713090">
              {'saitama'}
            </NameLink>
          </b>
        </Tooltip>
        <b>{' & junto '}</b>
      </MadeBy>
      <Divider>{'|'}</Divider>
      <Links>
        <Link href="https://twitter.com/BasisCash" target={'_blank'}>
          twitter
        </Link>
        <Link href="https://discord.gg/UEZq3HF5Eu" target={'_blank'}>
          discord
        </Link>
        <Link href="https://t.me/basiscash" target={'_blank'}>
          telegram
        </Link>
        <Link href="https://www.coingecko.com/en/coins/basis-cash" target={'_blank'}>
          coingecko
        </Link>
        <Link href="https://github.com/Basis-Cash" target={'_blank'}>
          github
        </Link>
        <Link href="https://medium.com/basis-cash" target={'_blank'}>
          medium
        </Link>
      </Links>
      <Divider>{'|'}</Divider>
      <Mode onClick={() => dispatch.toggleTheme()}>
        {theme.name === ThemeNames.light ? 'light mode 🌞' : 'dark mode 🌙'}{' '}
      </Mode>
    </Container>
  );
};
