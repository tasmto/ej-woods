import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { ClerkProvider } from '@clerk/nextjs'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { loggerLink } from '@trpc/client/links/loggerLink'
import { withTRPC } from '@trpc/next'
import { Provider } from 'jotai'
import type { AppProps } from 'next/app'
import superjson from 'superjson'
import { api } from "@/utils/api";

import "@/styles/globals.css";
import { apiUrl } from "@/constants/constants";
import { AppRouter } from "@/server/api/root";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
     <ClerkProvider {...pageProps}>
      <Provider>
        <Component {...pageProps} />
      </Provider>
    </ClerkProvider>
  );
};

const defaultLinkOptions = httpBatchLink({
  // maxBatchSize: 10,
  url: apiUrl,
})

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const links =
      process.env.NODE_ENV !== 'production'
        ? [(loggerLink(), defaultLinkOptions)]
        : [defaultLinkOptions]

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: { staleTime: Infinity }, // Never stale requests
        },
      },
      headers() {
        // We use this to send request headers to our server allowing us to use cookies
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1', // Means the request is done on the server
          }
        }
        return {}
      },
      links,
      transformer: superjson,
    }
  },
  ssr: true, // means we make requests through the client (false is useful for dev mode)
})(MyApp)

