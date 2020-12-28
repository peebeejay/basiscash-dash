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
      <meta charSet="utf-8" />
      <meta
        name="keywords"
        content={
          'Basis Cash, bac, bas, cryptocurrency, bitcoin, empty set dollar, basis dollar, stablecoin, esd, bsd'
        }
      />
      <meta
        name="description"
        content="View realtime Basis Cash metrics and statistics."
      />
      <title>{`Basis Cash - Metrics - $${formatNumber(bacSpot, 3)}`}</title>
      <link rel="canonical" href="https://bc.tools" />
    </ReactHelmet>
  );
};
