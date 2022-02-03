import App, { AppContext, AppProps } from 'next/app';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';
import { wrapper } from '../store';


const app = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<GlobalStyle />
			<Header />	
			<Component {...pageProps} />
			<div id='root-modal' />
		</>
	);
};

// app.getInitialProps 사용 X.. index.tsx에서 해결

export default wrapper.withRedux(app);
