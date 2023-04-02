import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import useAsyncCache from '~/hooks/useAsyncCache';

export default function App({ Component, pageProps }: AppProps) {
  useAsyncCache();
  return <Component {...pageProps} />
}
