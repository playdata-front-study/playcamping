//* 공통 redux state
export type CommonState = {
  validateMode: boolean;
};

//* 숙소 등록하기 redux state
type RegisterRoomState = {
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
