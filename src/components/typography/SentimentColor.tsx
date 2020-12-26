import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getUserLocale } from 'get-user-locale';

type Props = {
  value: number;
  children: React.ReactNode;
};

enum ColorStates {
  Celebrate = 'Celebrate', // Western World - Green; Eastern - Red
  Sad = 'Sad', // Western World - Red; Eastern - Black / Green
  Neutral = 'Neutral',
}

type LanguageTags = { [key: string]: boolean };

const asianLanguageTags: LanguageTags = {
  zh: true,
  'zh-CN': true,
  'zh-TW': true,
  'zh-HK': true,
  ja: true,
  'ja-JP': true,
  ko: true,
  'ko-KR': true,
};

const Value = styled.div<{
  colorState: ColorStates;
  shouldInvert: boolean;
}>`
  transition: 350ms color ease;
  color: ${({ colorState, theme, shouldInvert }) => {
    switch (colorState) {
      case ColorStates.Neutral:
        return theme.textColor;

      case ColorStates.Sad:
        return shouldInvert ? theme.textColorSadAsia : theme.textColorSad;

      case ColorStates.Celebrate:
        return shouldInvert ? theme.textColorCelebrateAsia : theme.textColorCelebrate;

      default:
        return theme.textColor;
    }
  }};
`;

export const SentimentColor = ({ value, children }: Props) => {
  const [storedValue, setStoredValue] = useState<number>(value);
  const [colorState, setColorState] = useState<ColorStates>(ColorStates.Neutral);
  const [locale] = useState<string>(getUserLocale());

  /*
   * This hook updates the color state if there's a difference between the incoming prop
   * and the stored value in state
   */
  useEffect(() => {
    if (value < storedValue) {
      setColorState(ColorStates.Sad);
    } else if (value > storedValue) {
      setColorState(ColorStates.Celebrate);
    } else if (value === storedValue) {
      setColorState(ColorStates.Neutral);
    }

    setStoredValue(value);
  }, [value]);

  return (
    <Value shouldInvert={!!asianLanguageTags[locale]} colorState={colorState}>
      {children}
    </Value>
  );
};
