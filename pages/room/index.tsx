import React from "react";
import { NextPage } from "next";
import { getRoomListAPI } from "../../lib/api/rooms";
import { roomActions } from "../../store/room";
import RoomMain from "../../components/room/main/RoomMain";
import { wrapper } from "../../store";

const index: NextPage = () => {
  return <RoomMain />;
};

index.getInitialProps = wrapper.getInitialPageProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const {
        checkInDate,
        checkOutDate,
        adultCount,
        childrenCount,
        latitude,
        longitude,
      } = etc.query;
      console.log("checkInDate");
      console.log(etc.query);

      try {
        const { data } = await getRoomListAPI({
          checkInDate,
          checkOutDate,
          adultCount,
          childrenCount,
          latitude,
          longitude,
          location: etc.query.location
            ? encodeURI(etc.query.location as string) // 한글 encode
            : undefined,
        });

        store.dispatch(roomActions.setRooms(data));
      } catch (e) {
        console.log(e);
      }
      return {};
    }
);

export default index;
