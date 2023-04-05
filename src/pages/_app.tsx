import type { AppProps } from 'next/app';
import useAsyncCache from '~/hooks/useAsyncCache';

import '~/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useAsyncCache();
  return <Component {...pageProps} />;
}
