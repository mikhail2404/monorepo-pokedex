import "@/styles/globals.css";

import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { CircularProgress } from "@mui/material";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ErrorBoundary } from "utils";

import Layout from "@/layouts/Layout";
import { wrapper } from "@/store/store";

const App = ({ Component, pageProps }: AppProps) => {
  const { store } = wrapper.useWrappedStore(pageProps);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function handleRouteChange() {
      setLoading(true);
    }

    function handleRouteChangeComplete() {
      setLoading(false);
    }

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Layout>
          {loading ? (
            <CircularProgress size={200} />
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
