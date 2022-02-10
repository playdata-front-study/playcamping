import axios from "axios";
import { NextPage } from "next";
import ManageMain from "../../components/manage/ManageMain";
import RoomMain from "../../components/room/main/RoomMain";
import { meAPI } from "../../lib/api/auth";
import { getHostRoomListAPI } from "../../lib/api/rooms";
import { cookieStringToObject } from "../../lib/utils";
import { wrapper } from "../../store";
import { roomActions } from "../../store/room";

const index: NextPage = () => {
  return <ManageMain/>
};

//ServerSideProps 에서 dispatch 보내면 클라이언트측 state에 반영이 안된다....?
// index.getServerSideProps = wrapper.getServerSideProps(
// 	(store) =>
// 		async ({ req, res, ...etc }) => {
// 			console.log('getServerSideProps 실행');
// 			const userId = store.getState().user.id;
// 			try {
// 				if (userId) {
// 					const { data } = await getHostRoomListAPI(userId);
// 					store.dispatch(roomActions.setRooms(data));
// 				}
// 			} catch (e) {
// 				console.log(e);
// 			}
// 		}
// );


index.getInitialProps = wrapper.getInitialPageProps(
  (store) => 
    async ({ req, res, ...etc }) => {
    const cookieObject = cookieStringToObject(req?.headers.cookie);
    const { isLogged } = store.getState().user;

    try {
      if (!isLogged && cookieObject.access_token) {
        axios.defaults.headers.cookie = cookieObject.access_token;
        const userRes = await meAPI();
        const userId = userRes.data.id;
        const { data } = await getHostRoomListAPI(userId);
        store.dispatch(roomActions.setRooms(data));
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export default index;