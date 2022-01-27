import { BedType, RoomType } from "./room";
import { UserType } from "./user";

//* 공통 redux state
export type CommonState = {
  validateMode: boolean;
};

//* 유저 redux state
export type UserState = UserType & {
  isLogged: boolean;
};

//* 숙소 등록하기 redux state
export type RegisterRoomState = {
  maximumGuestCount: number;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
  photos: string[];
  title: string;
  price: number;
  startDate: string | null;
  endDate: string | null;
};

//* 숙소 검색 redux state
export type SearchRoomState = {
  location: string;
  latitude: number;
  longitude: number;
  checkInDate: string | null;
  checkOutDate: string | null;
  adultCount: number;
  childrenCount: number;
};

//* 숙소 redux state
export type RoomState = {
  rooms: RoomType[];
};
