/**
 * 1. api method가 POST인지 확인한다.
 * 2. req.body에 필요한 값이 전부 들어있는지 확인한다.
 * 3. 'data/rooms.json'에 저장한다
 */
import { NextApiResponse, NextApiRequest } from "next";
import { isEmpty } from "lodash";
import { StoredRoomType } from "../../../types/room";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    //숙소 등록하기
    try {
      const {
        maximumGuestCount,
        latitude,
        longitude,
        country,
        city,
        district,
        streetAddress,
        detailAddress,
        postcode,
        photos,
        title,
        price,
        startDate,
        endDate,
        hostId,
      } = req.body;
      if (
        !maximumGuestCount ||
        !latitude ||
        !longitude ||
        !country ||
        !city ||
        !district ||
        !streetAddress ||
        !postcode ||
        !photos ||
        !title ||
        !price ||
        !startDate ||
        !endDate ||
        !hostId
      ) {
        res.statusCode = 400;
        res.send("필수 값이 없습니다. 체크리스트를 확인해주세요!");
        console.log("필수 값 없음 400에러");
      }
      const rooms = Data.room.getList();
      if (isEmpty(rooms)) {
        //room 리스트가 비어있다면(처음 등록하는거라면)
        const newRoom: StoredRoomType = {
          id: 1, //id는 1번부터 시작
          ...req.body,
          createdAt: new Date(),
          updateAt: new Date(),
        };
        Data.room.write([newRoom]);
        res.statusCode = 201;
        return res.end();
      }

      const newRoom: StoredRoomType = {
        id: rooms[rooms.length - 1].id + 1, //마지막 id에서 +1
        ...req.body,
        createdAt: new Date(),
        updateAt: new Date(),
      };
      Data.room.write([...rooms, newRoom]);
      res.statusCode = 201;
      return res.end();
    } catch (e) {
      console.log(e);
      return res.send(e.message);
    }
  }

  //* 숙소 리스트 검색
  if (req.method === "GET") {
    console.log("GET메서드 실행");
    console.log(req.query);
    const {
      checkInDate,
      checkOutDate,
      adultCount,
      childrenCount,
      latitude,
      longitude,
      location,
    } = req.query;

    try {
      const rooms = await Data.room.getList();

      // // 각 조건으로 검색
      // const filteredRooms = rooms.filter((room) => {
      // 	if (latitude && latitude !== '0' && longitude && longitude !== '0') {
      // 		if (
      // 			!(
      // 				Number(latitude) - 0.5 < room.latitude &&
      // 				room.latitude < Number(latitude) + 0.05 &&
      // 				Number(longitude) - 0.5 < room.longitude &&
      // 				room.longitude < Number(longitude) + 0.05
      // 			)
      // 		) {
      // 			return false;
      // 		}
      // 	}
      // 	if (checkInDate) {
      // 		if (
      // 			new Date(checkInDate as string) < new Date(room.startDate) ||
      // 			new Date(checkInDate as string) > new Date(room.endDate)
      // 		) {
      // 			return false;
      // 		}
      // 	}
      // 	if (checkOutDate) {
      // 		if (
      // 			new Date(checkOutDate as string) < new Date(room.startDate) ||
      // 			new Date(checkOutDate as string) > new Date(room.endDate)
      // 		) {
      // 			return false;
      // 		}
      // 	}

      // if (
      // 	room.maximumGuestCount <
      // 	Number(adultCount as string) +
      // 		(Number(childrenCount as string) * 0.5 || 0)
      // ) {
      // 	return false;
      // }

      // return true;
      // });

      //* host 정보 넣기
      const roomsWithHost = await Promise.all(
        // filteredRooms.map(async (room) => {
        rooms.map(async (room) => {
          const host = await Data.user.find({ id: room.hostId });
          return { ...room, host };
        })
      );

      res.statusCode = 200;
      return res.send(roomsWithHost);
    } catch (e) {
      console.log(e);
    }
  }

  res.statusCode = 405;

  return res.end();
};
