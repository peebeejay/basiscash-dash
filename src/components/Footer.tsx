import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

type Props = {};

const Container = styled.footer`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${rem(5)};
`;

const MadeBy = styled.div`
  color: black;
`;

const Links = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Link = styled.a`
  color: black;
  margin-right: ${rem(10)};
  text-decoration: none;
`;

const Mode = styled.div`
  color: black;
`;

const Divider = styled.div`
  font-size: ${rem(10)};
  font-weight: 700;
  margin: 0 ${rem(5)};
`;

export const Footer = (props: Props) => {
  return (
    <Container>
      <MadeBy>{'made by saitama + junto'}</MadeBy>
      <Divider>{'|'}</Divider>
      <Links>
        <Link href="https://twitter.com">twitter</Link>
        <Link href="https://twitter.com">discord</Link>
        <Link href="https://twitter.com">telegram</Link>
        <Link href="https://twitter.com">coingecko</Link>
        <Link href="https://twitter.com">github</Link>
      </Links>
      <Divider>{'|'}</Divider>
      <Mode>theme options</Mode>
    </Container>
  );
};
