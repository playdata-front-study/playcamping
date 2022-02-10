import axios from "axios";
import { NextApiResponse, NextApiRequest } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const { address } = req.query;
    if (!address) {
      res.statusCode = 400;
      return res.send("위치 정보가 없습니다.");
    }
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?sensor=false&language=ko&address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;
      const { data } = await axios.get(url); //도로명 주소를 보내고

      const { lat, lng } = data.results[0].geometry.location; //위도 경도를 받아와서

      if (!lat || !lng) {
        const urld = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ko&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}`;

        const { data } = await axios.get(urld);
        console.log(data);
        res.send(data);
      }

      //   if (data.results[0].address_components.length === 4) {
      //     const addressComponent = data.results[1].address_components; //책에 0번째 적혀있어...이자식
      //     const result = {
      //       latitude: lat,
      //       longitude: lng,
      //       // country: addressComponent[4].long_name,
      //       city: addressComponent[3].long_name,
      //       district: addressComponent[2].long_name,
      //       streetAddress: `${addressComponent[1].long_name}${addressComponent[0].long_name}`,
      //       postcode: addressComponent[5].long_name,
      //     };
      //     res.statusCode = 200;
      //     res.send(result);
      //   } else if (data.results[0].address_components.length === 6) {
      //     const addressComponent = data.results[0].address_components; //책에 0번째 적혀있어...이자식
      //     const result = {
      //       latitude: lat,
      //       longitude: lng,
      //       // country: addressComponent[4].long_name,
      //       city: addressComponent[3].long_name,
      //       district: addressComponent[2].long_name,
      //       streetAddress: `${addressComponent[1].long_name}${addressComponent[0].long_name}`,
      //       postcode: addressComponent[5].long_name,
      //     };
      res.statusCode = 200;
      // res.send(result);
      //   }
    } catch (e) {
      console.log(e);
      return res.end();
    }
  }
  res.statusCode = 405; // get 요청이 아니라서 여기로 넘어온 거 같은데.. 근데 14라인에서 콘솔은 왜 찍히는건데..?
  return res.end();
};
