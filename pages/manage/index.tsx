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
export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req, res, ...etc }) => {
			const userId = store.getState().user.id;
			try {
				if (userId) {
					const { data } = await getHostRoomListAPI(userId);
					store.dispatch(roomActions.setRooms(data));
				}
			} catch (e) {
				console.log(e);
			}
		}
);

export default index;