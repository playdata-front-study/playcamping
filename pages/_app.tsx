import App, { AppContext, AppProps } from 'next/app';
import axios from '../lib/api';
import Header from '../components/Header';
import GlobalStyle from '../styles/GlobalStyle';
import { wrapper } from '../store';
import { cookieStringToObject } from '../lib/utils';
import { meAPI } from '../lib/api/auth';
import { userActions } from '../store/user';
import { GetServerSideProps } from 'next';

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

app.getInitialProps = async (context: AppContext) => {
	const appInitialProps = await App.getInitialProps(context);
	console.log(context);
	// 여기에서 로그인 유지 해결해야함

	return { ...appInitialProps };
};

export default wrapper.withRedux(app);
