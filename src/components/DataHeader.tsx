import React from 'react';
import styled from 'styled-components';

const Purple = '#7d7dfc';

type Props = {
  text: string;
};

const Header = styled.div`
  color: ${Purple};
`;

export const DataHeader = (props: Props) => {
  const { text } = props;

  return <Header>{text}</Header>;
};
