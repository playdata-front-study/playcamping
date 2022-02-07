 import { NextApiResponse, NextApiRequest } from "next";
 import { isEmpty } from "lodash";
 import { StoredRoomType } from "../../../types/room";
 import Data from "../../../lib/data";
import { meAPI } from "../../../lib/api/auth";
 
 
 export default async (req: NextApiRequest, res: NextApiResponse) => {
  
   //* 등록한 숙소만 검색
   if (req.method === 'GET') {
     console.log('pages/api/rooms : GET query ???', req.query);
    
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
 
       //* host 정보 넣기
       const roomsWithHost = await Promise.all(

          rooms.map(async (room) => {
           const host = await Data.user.find({ id: room.hostId });
           return { ...room, host };
         })
       );

      //현재 로그인된 회원의 이메일과 패스워드가 room 의 호스트 이메일과 패스워드가 같으면 true
      const filteredRooms = roomsWithHost.filter((room) => {
       
          console.log(room.host.email)
          
          if (room.host.email === 'seeunjin22@naver.com') {
            
            return true;
          }
          return false;
        
      });

 
       res.statusCode = 200;
       console.log('검색된 캠핑장');
       console.log(roomsWithHost);
       return res.send(filteredRooms);
     } catch (e) {
       console.log(e);
     }
   }
 
   res.statusCode = 405;
 
   return res.end();
 };
 
 
 