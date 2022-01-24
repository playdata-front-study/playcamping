import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();
      //다음 코드처럼 parse 함수를 이용하여 파일의 정보를 받을 수 있음
      form.parse(req, async (err, fields, files) => {
        console.log(files);
      });
    } catch (e) {
      console.log(e);
      res.end();
    }
  }
  res.statusCode = 405;

  return res.end();
};
