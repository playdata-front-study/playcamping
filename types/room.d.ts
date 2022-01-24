//리덕스의 registerROOM에 들어 있는 값에서 id, createdAt, updateAt, hostId가 추가됨
//hostId는 숙소의 호스트로 api를 보낼 때 body에 userId를 보낼 예정임
export type StoredRoomType = {
  id: number;
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  photos: string[];
  title: string;
  price: string;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updateAt: Date;
  hostId: number;
};
