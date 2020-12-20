import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

type Props = {};

const Container = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${rem(10)};
  font-size: ${rem(14)};
`;

const MadeBy = styled.div`
  color: black;
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
  color: black;
  text-decoration: none;
  transition: 250ms color ease;

  &:not(:last-child) {
    margin-right: ${rem(10)};
  }

  &:hover {
    color: purple;
  }
`;

const Mode = styled.div`
  color: black;
`;

const Divider = styled.div`
  font-size: ${rem(16)};
  margin: 0 ${rem(5)};
`;

export const Footer = (props: Props) => {
  return (
    <Container>
      <MadeBy>
        {'made by '}
        <b>{'saitama & junto '}</b>
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
      <Mode>theme (soon)</Mode>
    </Container>
  );
};
