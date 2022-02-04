import React from "react";
import { NextPage, NextPageContext } from "next";
import { getRoomListAPI } from "../../lib/api/rooms";
import { roomActions } from "../../store/room";
import RoomMain from "../../components/room/main/RoomMain";
import { wrapper } from "../../store";

const index: NextPage = () => {
  return <RoomMain />;
};

// index.getInitialProps = ({ store, query }: NextPageContext) => {
//   console.log(query);
//   //   console.log(query);
//   return {};
// };

index.getInitialProps = wrapper.getInitialPageProps((store) => async () => {
  //   console.log(store);

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
    const { data } = await getRoomListAPI({
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

/**
 * getInitialProps로는 store에 접근 불가(왜그런진 모르겟음....) 그래서 getServerSideProps 사용
 * next-redux-wrapper 7버전 이후로 사용방법 좀 바뀜. (store) => async () => {} 형식으로 사용해야함.
 */
// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) => async () => {
// 		console.log('room/index 의 getServerSideProps');
// 		// console.log('room/index.tsx  context???');
// 		// console.log(store);
// 		// console.log(store.getState());
// 		// console.log(store.getState().searchRoom);

// 		const {
// 			location,
// 			checkInDate,
// 			checkOutDate,
// 			adultCount,
// 			childrenCount,
// 			latitude,
// 			longitude,
// 		} = store.getState().searchRoom;

// 		try {
// 			const { data } = await getRoomListAPI({
// 				checkInDate,
// 				checkOutDate,
// 				adultCount,
// 				childrenCount,
// 				latitude,
// 				longitude,
// 				location,
// 			});
// 			store.dispatch(roomActions.setRooms(data));
// 		} catch (e) {
// 			console.log(e);
// 		}

// 		return {};
// 	}
// );

// 원래 책에 있던 코드
// index.getInitialProps = async ({ store, query }) => {
// 	console.log(store); // undefined 나오는데............
// 	console.log(query);

// 	const {
// 		checkInDate,
// 		checkOutDate,
// 		adultCount,
// 		childrenCount,
// 		latitude,
// 		longitude,
// 		limit,
// 		page = '1',
// 	} = query;

// 	try {
// 		const { data } = await getRoomListAPI({
// 			checkInDate,
// 			checkOutDate,
// 			adultCount,
// 			childrenCount,
// 			latitude,
// 			longitude,
// 			limit: limit || '20',
// 			page: page || '1',
// 			location: query.location
// 				? encodeURI(query.location as string) // 한클 encode
// 				: undefined,
// 		});

// 		store.dispatch(roomActions.setRooms(data)); // undefined 니까 당연히 dispatch라는 함수도 안가지고있지
// 	} catch (e) {
// 		console.log(e);
// 	}

// 	return {};
// };

export default index;
