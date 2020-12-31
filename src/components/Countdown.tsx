import { useState, useEffect } from 'react';
import { INFLATION_THRESHOLD_PRICE } from '../constants';
import { Duration } from 'luxon';
import Confetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';
import { Data } from './DashboardProvider/state';
import { CONFETTI_DISPLAY_TIME } from '../constants';
import { getMsToSeignorage } from '../utils';

type Props = {
  data: Data;
};

export const Countdown = (props: Props) => {
  const { prices } = props.data;
  const [countdown, setCountdown] = useState<number>(getMsToSeignorage());
  const [isConfettiEnabled, setIsConfettiEnabled] = useState<boolean>(false);
  const { width, height } = useWindowSize();
  const willExpand = prices.bacTwap > INFLATION_THRESHOLD_PRICE;

  /* This hook is used to generate a string representing the duration between now
   * and the next seignorage event 00:00 UTC
   */
  useEffect(() => {
    const getCountdown = () => setCountdown(getMsToSeignorage());
    getCountdown();
    const interval = setInterval(getCountdown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  /** This hook is used to check whether to enable the countdown confetti */
  useEffect(() => {
    if (countdown < 1001 && willExpand && !isConfettiEnabled) {
      setIsConfettiEnabled(true);
    }
  }, [countdown, willExpand, isConfettiEnabled]);

  /** This hook is used to turn off confetti after a set display time */
  useEffect(() => {
    if (isConfettiEnabled) {
      setTimeout(() => {
        setIsConfettiEnabled(false);
      }, CONFETTI_DISPLAY_TIME);
    }
  }, [isConfettiEnabled]);

  return (
    <>
      <Confetti
        width={width}
        height={height}
        colors={['#ECA6ED', '#9D77D9', '#554AC6', '#0519B1']}
        numberOfPieces={isConfettiEnabled ? 500 : 0}
      />
      {Duration.fromMillis(countdown).toFormat('hh:mm:ss')}
    </>
  );
};
