import axios from 'axios';
import { stringify } from 'querystring';

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

//현재 위치 정보 가져오기 api
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

//* input string으로 장소 검색하는 api
export const searchPlacesAPI = (keyword: string) =>
	axios.get<{ description: string; placeId: string }[]>(
		`api/maps/places?keyword=${keyword}`
	);

//* placeId로 장소 정보 가져오는 api
export const getPlaceAPI = (placeId: string) =>
	axios.get<{ location: string; latitude: number; longitude: number }>(
		`/api/maps/places/${placeId}`
	);
