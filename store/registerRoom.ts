import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RegisterRoomState } from "../types/reduxState";
//책에는 여기서 type을 정해주는데
//types디렉에서 reduxState로 가져오니까 안해도 되는거 같음

//* 초기 상태
const initialState: RegisterRoomState = {
  //* 캠핑 종류
  campingType: null,
  //* 편의 시설
  amenities: [],
  //* 인원수
  maximumGuestCount: 0,
  //* 국가/지역
  country: "",
  //* 시/도
  city: "",
  //* 시/군/구
  district: "",
  //* 도로명주소
  streetAddress: "",
  //* 동호수
  detailAddress: "",
  //* 우편번호
  postcode: "",
  //* 위도
  latitude: 0,
  //* 경도
  longitude: 0,
  //* 편의시설
  photos: [],
  //* 숙소 제목
  title: "",
  //* 숙소 설명
  description: "",
  //* 숙소 요금
  price: 0,
  //* 예약 시작 날짜
  startDate: null,
  //* 예약 마감 날짜
  endDate: null,
};

const registerRoom = createSlice({
  name: "registerRoom",
  initialState,
  reducers: {
    //* 캠핑 종류 변경하기
    setCampingType(state, action: PayloadAction<string | null>) {
      state.campingType = action.payload;
    },
    //* 편의 공간 변경하기
    setAmenities(state, action: PayloadAction<string[]>) {
      state.amenities = action.payload;
    },
    //* 최대 인원수 변경하기
    setMaximumGuestCount(state, action: PayloadAction<number>) {
      state.maximumGuestCount = action.payload;
      return state; //state를 return ???
    },
    //* 국가 변경하기
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    //* 시/도 변경하기
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    //* 시/군/구 변경하기
    setDistrict(state, action: PayloadAction<string>) {
      state.district = action.payload;
    },
    //* 도로명주소 변경하기
    setStreetAddress(state, action: PayloadAction<string>) {
      state.streetAddress = action.payload;
    },
    //* 동호수 변경하기
    setDetailAddress(state, action: PayloadAction<string>) {
      state.detailAddress = action.payload;
    },
    //* 우편번호 변경하기
    setPostcode(state, action: PayloadAction<string>) {
      state.postcode = action.payload;
    },
    //* 위도 변경하기
    setLatitude(state, action: PayloadAction<number>) {
      state.latitude = action.payload;
    },
    //* 경도 변경하기
    setLongitude(state, action: PayloadAction<number>) {
      state.longitude = action.payload;
    },
    //* 숙소 사진 변경하기
    setPhotos(state, action: PayloadAction<string[]>) {
      state.photos = action.payload;
    },
    //* 숙소 제목 변경하기
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    //* 숙소 설명 변경하기
    setDescription(state, action: PayloadAction<string>) {
      state.description = action.payload;
    },
    //* 숙소 요금 변경하기
    setPrice(state, action: PayloadAction<number>) {
      state.price = action.payload;
    },
    //* 예약 시작 날짜 변경하기
    setStartDate(state, action: PayloadAction<string | null>) {
      state.startDate = action.payload;
    },
    //* 예약 마감 날짜 변경하기
    setEndDate(state, action: PayloadAction<string | null>) {
      state.endDate = action.payload;
    },
  },
});

export const registerRoomActions = { ...registerRoom.actions };

export default registerRoom;
