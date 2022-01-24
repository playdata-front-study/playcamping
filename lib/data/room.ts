/**숙소 정보는 'data/rooms.json에 저장하고, rooms.json을 쉽게 다루기 위한 숙소 파일 함수들 */
import { readFileSync, writeFileSync } from "fs";
import { StoredRoomType } from "../../types/room";

//*숙소 리스트 데이터 불러오기
const getList = () => {
  const roomBuffer = readFileSync("data/rooms.json");
  const roomString = roomBuffer.toString();
  if (!roomString) {
    return [];
  }

  const rooms: StoredRoomType[] = JSON.parse(roomString);
  return rooms;
};

//* id의 숙소가 있는지 확인하기
const exist = (roomId: number) => {
  const rooms = getList();
  return rooms.some((room) => room.id === roomId);
};

//* id의 숙소 불러오기
const find = (roomId: number) => {
  const rooms = getList();
  return rooms.find((room) => room.id === roomId);
};

//* 숙소 리스트 저장하기
const write = (rooms: StoredRoomType[]) => {
  writeFileSync("data/rooms.json", JSON.stringify(rooms));
};

export default { getList, exist, write, find };
