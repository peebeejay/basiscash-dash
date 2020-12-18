import React from 'react';
import styled from 'styled-components';

const white = '#FFFFFF';

type Props = {
  text: string;
};

const Value = styled.div`
  // color: ${white};
  color: black;
`;

export const DataValue = (props: Props) => {
  const { text } = props;

  return <Value>{text}</Value>;
};
