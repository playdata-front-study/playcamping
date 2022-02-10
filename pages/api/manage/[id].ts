import { NextApiResponse, NextApiRequest } from "next";
import Data from "../../../lib/data";

export default async (req: NextApiRequest, res: NextApiResponse) => {
 
  //* 등록한 숙소만 검색
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      const rooms = await Data.room
        .getList()
        .filter((v) => v.hostId === Number(id));

      //* host 정보 넣기
      const roomsWithHost = await Promise.all(
         rooms.map(async (room) => {
          const host = await Data.user.find({ id: room.hostId });
          const reservation = await Data.reservation.findReservations({ roomId: room.id });
          console.log(reservation);
          return { ...room, host, reservation };
        })
      );

      res.statusCode = 200;
      console.log('검색된 캠핑장');
      
      console.log(roomsWithHost);
      return res.send(roomsWithHost);
    } catch (e) {
      console.log(e);
    }
  }

  res.statusCode = 405;

  return res.end();
};
