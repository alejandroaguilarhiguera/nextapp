import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import useAsyncCache from '~/hooks/useAsyncCache';

import '~/styles/globals.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useAsyncCache();
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
