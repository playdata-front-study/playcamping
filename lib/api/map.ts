import axios from 'axios';
import { stringify } from 'querystring';

export const searchPlacesAPI = (keyword: string) =>
	axios.get<{ description: string; placeId: string }[]>(
		`api/maps/places?keyword=${keyword}`
	);
