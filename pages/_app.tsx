import App, { AppProps } from "next/app";
import axios from "../lib/api";
import Header from "../components/Header";
import GlobalStyle from "../styles/GlobalStyle";
import { wrapper } from "../store";
import { cookieStringToObject } from "../lib/utils";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
};

app.getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  const { isLogged } = store.getState().user;

  try {
    if (!isLogged && cookieObject.access_token) {
      // 유저 정보 store에 저장
      axios.defaults.headers.cookie = cookieObject.access_token;
      const userRes = await meAPI();
      store.dispatch(userActions.setLoggedUser(userRes.data));
      // 유저의 예약 내역 store에 저장
      // const reservationRes = await getUserReservationAPI(userRes.data.id);
      // store.dispatch(
      // 	reservationActions.setUserReservations(reservationRes.data)
      // );
    }
  } catch (e) {
    console.log(e);
  }

  return { ...appInitialProps };
});

export default wrapper.withRedux(app);
