import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type RegisterRoomState = {
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
};

//* 초기상태
const initialState: RegisterRoomState = {
  //* 국가/지역
  country: "",
  //* 시도
  city: "",
  //* 시군구
  district: "",
  //* 도로명
  streetAddress: "",
  //* 동호수
  detailAddress: "",
  //* 우편번호
  postcode: "",
  //* 위도
  latitude: 0,
  //* 경도
  longitude: 0,
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {
    //국가 변경하기
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    //시도 변경하기
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    //시군구 변경하기
    setDistrict(state, action: PayloadAction<string>) {
      state.district = action.payload;
    },
    //도로명주소 변경하기
    setStreetAddress(state, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
    },
    //동호수 변경하기
    setDetailAddress(state, action: PayloadAction<string>) {
      state.detailAddress = action.payload;
    },
    //우편번호 변경하기
    setPostcode(state, action: PayloadAction<string>) {
      state.postcode = action.payload;
    },
    //위도 변경하기
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    //경도 변경하기
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
