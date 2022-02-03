import axios from "axios";
import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { latitude, longitude } = req.query;
    if (!latitude || !longitude) {
      res.statusCode = 400;
      return res.send("위치 정보가 없습니다.");
    }
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
      const { data } = await axios.get(url);
      console.log(data.results[1]);

      const { lat, lng } = data.results[0].geometry.location;

      if (data.results[0].address_components.length === 4) {
        const addressComponent = data.results[1].address_components; //책에 0번째 적혀있어...이자식
        const result = {
          latitude: lat,
          longitude: lng,
          country: addressComponent[4].long_name,
          city: addressComponent[3].long_name,
          district: addressComponent[2].long_name,
          streetAddress: `${addressComponent[1].long_name}${addressComponent[0].long_name}`,
          postcode: addressComponent[5].long_name,
        };
        res.statusCode = 200;
        res.send(result);
      } else if (data.results[0].address_components.length === 6) {
        const addressComponent = data.results[0].address_components; //책에 0번째 적혀있어...이자식
        const result = {
          latitude: lat,
          longitude: lng,
          country: addressComponent[4].long_name,
          city: addressComponent[3].long_name,
          district: addressComponent[2].long_name,
          streetAddress: `${addressComponent[1].long_name}${addressComponent[0].long_name}`,
          postcode: addressComponent[5].long_name,
        };
        res.statusCode = 200;
        res.send(result);
      }
    } catch (e) {
      console.log(e);
      return res.end();
    }
  }
  res.statusCode = 405;
  return res.end();
};
