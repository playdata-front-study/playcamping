import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/common/Button";
import NavigationIcon from "../../../public/static/svg/register/navigation.svg";
import Input from "../../../components/common/Input";
import { useSelector } from "../../../store";
import { registerRoomActions } from "../../../store/registerRoom";

import {
  getLocationInfoAPI,
  getPlaceAPI,
  searchPlacesAPI,
} from "../../../lib/api/map";

import palette from "../../../styles/palette";
import { useDispatch } from "react-redux";
import RegisterRoomFooter from "./RegisterRoomFooter";
import RegisterRoomChecklist from "./RegisterRoomChecklist";
import useDebounce from "../../../hooks/useDebounce";
import { isEmpty } from "lodash";
import OutsideClickHandler from "react-outside-click-handler";

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
  .register-room-location-wrapper {
    margin-bottom: 24px;
    .register-room-button {
      width: 200px;
      margin-bottom: 24px;
    }
    .register-room-radio {
      width: 60px;
      margin-bottom: 50px;
    }
    .search-container {
      position: relative;
      width: 100%;
      height: 70px;
      border: 2px solid ${palette.gray};
      border-radius: 12px;
      cursor: pointer;
      &:hover {
        border-color: ${palette.cyan};
      }
      .search-bar-location-texts {
        position: absolute;
        width: calc(100% - 40px);
        top: 16px;
        left: 20px;

        input {
          width: 100%;
          border: 0;
          font-size: 14px;
          outline: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          &::placeholder {
            font-size: 14px;
            opacity: 0.7;
          }
        }
      }
      .search-bar-location-results {
        position: absolute;
        background-color: white;
        top: 78px;
        width: 500px;
        padding: 16px 0;
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        border-radius: 32px;
        cursor: default;
        overflow: hidden;
        z-index: 10;
        li {
          display: flex;
          align-items: center;
          height: 64px;
          padding: 8px 32px;
          cursor: pointer;
          &:hover {
            background-color: ${palette.whitegray};
          }
        }
      }
    }
  }
`;

const RegisterRoomLocation: React.FC = () => {
  const city = useSelector((state) => state.registerRoom.city);
  const district = useSelector((state) => state.registerRoom.district);
  const streetAddress = useSelector(
    (state) => state.registerRoom.streetAddress
  );
  const postcode = useSelector((state) => state.registerRoom.postcode);

  const [loading, setLoding] = useState(false);

  const dispatch = useDispatch();
  const [selected, setSelected] = useState(true);

  //라디오 버튼 선택 - 주소 불러오기 버튼 vs 직접 주소 입력하기
  const onSelect = (event: any) => {
    const radioId = event.target.id;
    if (radioId === "b") {
      setSelected(false);
    } else if (radioId === "a") {
      setSelected(true);
    }
  };

  const onChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setCity(event.target.value));
  };
  const onChangeDistrict = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setDistrict(event.target.value));
  };
  const onChangeStreetAddress = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch(registerRoomActions.setStreetAddress(event.target.value));
  };
  const onChangePostcode = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(registerRoomActions.setPostcode(event.target.value));
  };

  //현재 위치 불러오기에 성공했을때
  const onSuccessGetLocation = async ({ coords }: any) => {
    try {
      const { data: currentLocation } = await getLocationInfoAPI({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      dispatch(registerRoomActions.setCity(currentLocation.city));
      dispatch(registerRoomActions.setDistrict(currentLocation.district));
      dispatch(
        registerRoomActions.setStreetAddress(currentLocation.streetAddress)
      );
      dispatch(registerRoomActions.setPostcode(currentLocation.postcode));
      dispatch(registerRoomActions.setLatitude(currentLocation.latitude));
      dispatch(registerRoomActions.setLongitude(currentLocation.longitude));
      // console.log(data);
    } catch (e) {
      console.log(e);
      // alert(e?.message);
    }
    setLoding(false);
  };

  //현재 위치 사용 클릭 시
  const onClickGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      setLoding(true);
      // console.log(e);
      // alert(e?.message);
    });
  };

  const [popupOpened, setPopupOpened] = useState(false);
  const [results, setResults] = useState<
    { description: string; placeId: string }[]
  >([]);
  const location = useSelector((state) => state.registerRoom.location);
  // input값에 debounce 적용 - 특정 시간이 지난후 하나의 이벤트만 실행
  const searchKeyword = useDebounce(location, 150);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const setLocationDispatch = (value: string) => {
    dispatch(registerRoomActions.setLocation(value));
  };
  const setLatitudeDispatch = (value: number) => {
    dispatch(registerRoomActions.setLatitude(value));
  };
  const setLongitudeDispatch = (value: number) => {
    dispatch(registerRoomActions.setLongitude(value));
  };

  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setPopupOpened(true);
  };

  // 검색어가 변하면 장소 검색
  const searchPlaces = async () => {
    try {
      const { data } = await searchPlacesAPI(encodeURI(location));
      setResults(data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (!searchKeyword) {
      setResults([]);
    }
    if (searchKeyword) {
      searchPlaces();
    }
  }, [searchKeyword]);

  // // 근처 추천 장소 클릭시
  // const onClickNearPlaces = () => {
  //   setPopupOpened(false);
  //   navigator.geolocation.getCurrentPosition(
  //     ({ coords }) => {
  //       setLocationDispatch("근처 추천 장소");
  //       setLatitudeDispatch(coords.latitude);
  //       setLongitudeDispatch(coords.longitude);
  //     },
  //     (e) => {
  //       console.log(e);
  //     }
  //   );
  // };

  // 검색된 장소 클릭시
  const onClickResult = async (placeId: string) => {
    try {
      const { data } = await getPlaceAPI(placeId);
      setLocationDispatch(data.location);
      setLatitudeDispatch(data.latitude);
      setLongitudeDispatch(data.longitude);
      setPopupOpened(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <h2>🗺️ 캠핑장의 위치를 알려주세요.</h2>
      <h3>4단계</h3>
      <p className="register-room-step-info">
        정확한 캠핑장 주소는 게스트가 예약을 완료한 후에만 공개됩니다.
      </p>
      <div className="register-room-location-wrapper">
        <input
          className="register-room-radio"
          type="radio"
          id="a"
          name="getloc"
          onClick={onSelect}
        />
        <label>현재 위치 사용</label>
        <input
          className="register-room-radio"
          type="radio"
          id="b"
          name="getloc"
          onClick={onSelect}
        />
        <label>직접 주소 입력하기</label>
        {selected ? (
          <>
            <Button
              className="register-room-button"
              color="cyan"
              colorReverse
              icon={<NavigationIcon />}
              onClick={onClickGetCurrentLocation}
            >
              {loading ? "불러오는 중.." : "현재 위치 불러오기"}
            </Button>
            <Input
              label="시/도"
              value={city}
              onChange={onChangeCity}
              readOnly
            />
            <Input
              label="시/군/구"
              value={district}
              onChange={onChangeDistrict}
              readOnly
            />
            <Input
              label="도로명주소"
              value={streetAddress}
              onChange={onChangeStreetAddress}
              readOnly
            />
            <Input
              label="우편번호"
              value={postcode}
              onChange={onChangePostcode}
              readOnly
            />
          </>
        ) : (
          <div className="search-container" onClick={onClickInput}>
            <OutsideClickHandler onOutsideClick={() => setPopupOpened(false)}>
              <div className="search-bar-location-texts">
                <input
                  value={location}
                  onChange={(e) => setLocationDispatch(e.target.value)}
                  placeholder="주소를 직접 입력해주세요."
                  ref={inputRef}
                />
              </div>
              {popupOpened && location !== "주소를 직접 입력해주세요." && (
                <ul className="search-bar-location-results">
                  {/* {!location && (
                    <li role="presentation" onClick={onClickNearPlaces}>
                      근처 추천 장소
                    </li>
                  )} */}
                  {!isEmpty(results) &&
                    results.map((result, index) => (
                      <li
                        role="presentation"
                        key={index}
                        onClick={() => onClickResult(result.placeId)}
                      >
                        {result.description}
                      </li>
                    ))}
                  {location && isEmpty(results) && (
                    <li>검색 결과가 없습니다.</li>
                  )}
                </ul>
              )}
            </OutsideClickHandler>
          </div>
          // <Input
          //   label="주소를 직접 입력해주세요."
          //   value={address}
          // onChange={onSetAddress}
          // />
        )}
      </div>

      <RegisterRoomFooter
        isValid={false}
        prevHref="/room/register/guestcount"
        nextHref="/room/register/geometry"
      />
    </Container>
  );
};

export default RegisterRoomLocation;
