import { NextPage } from "next";
import RoomMain from "../../../components/room/main/RoomMain";
import { getHostRoomListAPI, getRoomListAPI } from "../../../lib/api/rooms";
import { cookieStringToObject } from "../../../lib/utils";
import { wrapper } from "../../../store";
import { roomActions } from "../../../store/room";

const campsitelist: NextPage = () => {
  return <RoomMain />;
};

campsitelist.getInitialProps = wrapper.getInitialPageProps((store) => async ({ req, res, ...etc }) => {
  console.log(store.getState().searchRoom)
 
  const hostId = store.getState().user.id;
  console.log("dddddddddd")
  console.log(hostId)
  console.log(req);
  const {
    location,
    checkInDate,
    checkOutDate,
    adultCount,
    childrenCount,
    latitude,
    longitude,
  } = store.getState().searchRoom;

  try {
    const { data } = await getHostRoomListAPI({
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      latitude,
      longitude,
      location,
    });
    store.dispatch(roomActions.setRooms(data));
  } catch (e) {
    console.log(e);
  }

  return {};
});


export default campsitelist;