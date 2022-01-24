import { AppProps } from "next/dist/shared/lib/router/router";
import React from "react";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store/index";
// import withRedux from "next-redux-wrapper";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
};

export default wrapper.withRedux(app);
