import axios from "axios";
import { RegisterRoomState } from "../../types/reduxState";

// 숙소 등록하기 & { hostId: number }
export const registerRoomAPI = (body: RegisterRoomState) => {
  axios.post("/api/rooms", body);
};
