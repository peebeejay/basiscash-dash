import { Helmet as ReactHelmet } from 'react-helmet';

export const Helmet = () => {
  return (
    <ReactHelmet>
      <meta charSet="utf-8" />
      <title>{'Basis Cash - Metrics'}</title>
      <link rel="canonical" href="https://bc.tools" />
    </ReactHelmet>
  );
};
