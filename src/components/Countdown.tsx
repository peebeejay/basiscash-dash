import { useState, useEffect } from 'react';
import { MS_IN_DAY } from '../constants';
import { DateTime, Duration } from 'luxon';

export const Countdown = () => {
  const [countdown, setCountdown] = useState<string>('');

  /* This hook is used to generate a string representing the duration between now
   * and the next seignorage event 00:00 UTC
   */
  useEffect(() => {
    const getCountdown = () => {
      const millis: number = MS_IN_DAY - (DateTime.utc().toMillis() % MS_IN_DAY);
      const difference = Duration.fromMillis(millis);
      setCountdown(difference.toFormat('hh:mm:ss'));
    };

    getCountdown();
    const interval = setInterval(getCountdown, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>{countdown}</>;
};
