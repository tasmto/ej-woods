import { Provider } from 'jotai';
import { AppProps } from 'next/app';

import '@/styles/globals.css';

import CartOverlay from '@/features/cart/components/CartOverlay';
import Header from '@/features/navigation/components/Header';
import MobileNav from '@/features/navigation/components/MobileNav';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consistent layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
        <Header />
        <CartOverlay />
        <MobileNav />

        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
