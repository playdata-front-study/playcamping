import { AppProps } from 'next/dist/shared/lib/router/router';
import React from 'react';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';

const app = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<GlobalStyle />
			<Header/>
			<Component {...pageProps} />
			<div id="root-modal"/>
		</>
	);
};

export default app;
