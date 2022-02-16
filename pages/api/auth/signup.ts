import { StoredUserType } from './../../../types/user.d';
import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async (req: NextApiRequest, res: NextApiResponse) => {

  if(req.method === "POST"){
    const { email, firstname, lastname, password, birthday } = req.body;
    if (!email || !firstname || !lastname || !password || !birthday) {
      res.statusCode = 400;
      return res.send("필수 데이터가 없습니다.");
    }

    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.statusCode = 409;
      res.send("이미 가입된 이메일 입니다.");
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const users = Data.user.getList();
    let userId;
    if(users.length === 0) {
      userId = 1;
    }else {
      userId = users[users.length-1].id + 1;
    }
    const newUser: StoredUserType = {
      id: userId,
      email,
      firstname,
      lastname,
      password: hashedPassword,
      birthday,
      profileImage: "/static/image/user/default_user_profile_image.jpg",
    };

    Data.user.write([...users, newUser])

    //회원가입 api를 사용하여 유저 정보 생성이 되고, 토큰생성하여 브라우저의 쿠키에 저장
    const token = jwt.sign(String(newUser.id), process.env.JWT_SECRET!);

    //만들어진 토큰을 브라우저의 쿠키에 저장할 수 있도록 res 헤더에 "Set-Cookie" 설정
    res.setHeader(
      "Set-Cookie",
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3).toUTCString}; httponly`
    ); // api 통신에서만 쿠키 값을 불러올 수 있고 http 이외의 접근은 불가능
      
    //StoredUserTyped의 password 속성을 partial로 만든 타입을 만들게 된다. 
    //-> 타입에러없이 deletet사용해 비밀번호 삭제 가능
      const newUserWithoutPassword: Partial<
      Pick<StoredUserType, "password">
      > = newUser;
    
      delete newUserWithoutPassword.password;
      res.statusCode = 200;
      return res.send(newUser);
  }


  
  res.statusCode = 405;

  return res.end();
}