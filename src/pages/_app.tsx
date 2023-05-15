import { SessionProvider } from 'next-auth/react';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import useAsyncCache from '~/hooks/useAsyncCache';

import '~/styles/globals.css';

const App = function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useAsyncCache();
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

export default appWithTranslation(App);
