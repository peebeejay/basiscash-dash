import { Helmet as ReactHelmet } from 'react-helmet';
import { formatNumber } from '../utils';
import { Data } from './DashboardProvider/state';

type Props = {
  data: Data;
};

export const Helmet = (props: Props) => {
  const {
    prices: { bacSpot },
  } = props.data;

  return (
    <ReactHelmet>
      <title>{`Basis Cash - Metrics - $${formatNumber(bacSpot, 3)}`}</title>
    </ReactHelmet>
  );
};
