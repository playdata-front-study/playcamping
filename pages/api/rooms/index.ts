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
      } = req.body;
      if (
        !latitude ||
        !longitude ||
        !country ||
        !city ||
        !district ||
        !streetAddress ||
        !detailAddress ||
        !postcode ||
        !photos ||
        !title ||
        !price ||
        !startDate ||
        !endDate
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
      // return res.send(e?.message);
    }
  }
  res.statusCode = 405;

  return res.end();
};
