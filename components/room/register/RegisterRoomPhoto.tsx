/**
 * 숙소의 사진을 업로드하기 위해서는 파일을 업로드하는 api를 만들고
 * file 타입의 인풋을 다루어서 이미지를 서버로 업로드
 * 결과적으로는 업로드한 파일의 url을 결과 값으로 받아 리덕스에 저장
 * 숙소 사진은 string[] 배열로 이루어져 있음
 * 타입: type RegisterRoomState ={ photos: string[] }
 * 리덕스의 초깃값: photos: []
 * 리듀서: setPhotos(state, acrion: PayloadAction<string[]>) { state.photos = action.payload; }
 */
import React from "react";
import styled from "styled-components";
import palette from "../../../styles/palette";

import { isEmpty } from "lodash";
import { useSelector } from "../../../store";
import UploadIcon from "../../../public/static/svg/register/upload.svg";
import Button from "../../common/Button";

import { uploadFileAPI } from "../../../lib/api/file";
import RegisterRoomFooter from "./RegisterRoomFooter";
import RegisterRoomChecklist from "./RegisterRoomChecklist";
import { useDispatch } from "react-redux";
import { registerRoomActions } from "../../../store/registerRoom";
import RegisterRoomPhotoCardList from "./RegisterRoomPhotoCardList";

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-weight: bold;
    color: ${palette.gray};
    margin-bottom: 6px;
  }
  .register-room-step-info {
    font-size: 14px;
    max-width: 400px;
    margin-bottom: 24px;
  }
  .register-room-upload-photo-wrapper {
    width: 80%; //858px
    height: 300px; //433px
    margin: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px dashed ${palette.gray};
    border-radius: 6px;

    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0; //?
      cursor: pointer;
    }
    img {
      width: 100%;
      max-height: 100%;
    }
  }
`;

const RegisterRoomPhoto: React.FC = () => {
  const photos = useSelector((state) => state.registerRoom.photos);

  const dispatch = useDispatch();

  //*이미지 업로드하기
  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    //파일을 선택한 후 취소를 누르면 files가 비어있는 채로 이벤트가 호출됨
    //불필요한 실행을 방지하기 위해 files.length > 0이라는 조건을 추가함
    if (files && files.length > 0) {
      const file = files[0];
      const formdata = new FormData();
      formdata.append("file", file);
      try {
        const { data } = await uploadFileAPI(formdata);
        if (data) {
          dispatch(registerRoomActions.setPhotos([...photos, data]));
        }
      } catch (e) {
        console.log(e);
      }
    }
    // console.log(files);
  };
  return (
    <Container>
      <h2>📸 캠핑장 사진 올리기</h2>
      <h3>3단계</h3>
      <p className="register-room-step-info">
        게스트가 사진을 보고 캠핑장의 느낌을 생생히 떠올려볼 수 있도록 해주세요.
        우선 사진 1장을 업로드하고 숙소를 등록한 후에 추가할 수 있습니다.
      </p>
      {isEmpty(photos) && (
        <div className="register-room-upload-photo-wrapper">
          <>
            <input type="file" accept="image/*" onChange={uploadImage} />
            <Button icon={<UploadIcon />} color="pink" width="167px">
              사진 업로드
            </Button>
          </>
        </div>
      )}
      {!isEmpty(photos) && <RegisterRoomPhotoCardList photos={photos} />}
      <RegisterRoomChecklist />
      <RegisterRoomFooter
        isValid={false}
        prevHref="/room/register/geometry"
        nextHref="/room/register/title"
      />
    </Container>
  );
};

export default RegisterRoomPhoto;
