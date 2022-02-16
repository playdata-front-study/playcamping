import axios from "axios";

type GetLocationInfoAPIResponse = {
  country: string;
  city: string;
  district: string;
  streetAddress: string;
  detailAddress: string;
  postcode: string;
  latitude: number;
  longitude: number;
};

type getLatLngInfoAPIResponse = {
  latitude: number;
  longitude: number;
};

//현재 위치 정보 가져오기 api
/** http://localhost:3000/api/maps/location?latitude=37.5512255&longitude=127.1772032  */
export const getLocationInfoAPI = async ({
  latitude,
  longitude,
}: {
  latitude: number; //왜 이렇게 쓰는거야..?
  longitude: number;
}) =>
  axios.get<GetLocationInfoAPIResponse>(
    `/api/maps/location?latitude=${latitude}&longitude=${longitude}`
  );

/**http://localhost:3000/room/register/api/maps/places?keyword=%EC%84%9C%EC%9A%B8%EC%8B%9C%20%EA%B0%95%EB%8F%99%EA%B5%AC */
//* input string으로 장소 검색하는 api
export const searchPlacesAPI = (keyword: string) =>
  axios.get<{ description: string; placeId: string }[]>(
    `/api/maps/places?keyword=${keyword}`
  );

//* placeId로 장소 정보 가져오는 api
export const getPlaceAPI = (placeId: string) =>
  axios.get<{ location: string; latitude: number; longitude: number }>(
    `/api/maps/places/${placeId}`
  );
