import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
/**파일을 aws-sdk를 이용하여 버킷에 업로드하겠음
 * aws-sdk는 aws를 프로그래밍적으로 제어하기 편리하도록 제공되는 라이브러리임
 */
import aws from "aws-sdk";
import { createReadStream } from "fs";
/**같은 파일을 S3에 올리게 되면 기존의 파일에 덮어씌우게 되므로 기존 파일이 사라짐
 * 따라서 파일마다 고유한 아이디를 추가해야함
 * uuid는 유니크한 id를 생성하는 라이브러리
 */
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const form = new formidable.IncomingForm();
    //다음 코드처럼 parse 함수를 이용하여 파일의 정보를 받을 수 있음
    const url = await new Promise((resolve, reject) => {
      form.parse(req, async (err, fields, files) => {
        const s3 = new aws.S3({
          accessKeyId: process.env.ACCESSKEY_ID,
          secretAccessKey: process.env.SECRET_ACCESSKEY_ID,
        });
        // console.log(files.file.originalFilename);
        // console.log(files.file.filepath);
        const fileName = files.file.originalFilename;
        // console.log(fileName);
        const filePath = files.file.filepath;
        // console.log(filePath);
        const stream = createReadStream(files.file.filepath);

        //*파일 이름
        const originalFilename = fileName.split(".").shift();
        //*확장자
        const fileExtension = filePath.split(".").pop();

        /**s3의 upload함수를 이용하여 파일을 업로드 */
        await s3
          .upload({
            Bucket: process.env.S3_BUCKET_NAME!, //파일을 업로드할 버킷이름
            Key: `${originalFilename}__${uuidv4()}.${fileExtension}`, //버킷에 저장될 파일의 이름
            ACL: "public-read", //버킷 및 파일에 대한 액세스 제어 리스트 설정
            Body: stream, //업로드할 파일의 스트림 값
          })
          .promise()
          //Promise를 이용하여 Location값을 받도록 하여 res로 전달
          .then((res) => resolve(res.Location))
          .catch((e) => reject(e));
      });
    });
    res.statusCode = 201;
    console.log(url);
    res.send(url);

    return res.end();
  }
};
