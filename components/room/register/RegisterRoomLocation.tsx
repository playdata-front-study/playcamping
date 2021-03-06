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
        width: 360px;
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

  //????????? ?????? ?????? - ?????? ???????????? ?????? vs ?????? ?????? ????????????
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

  //?????? ?????? ??????????????? ???????????????
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

  //?????? ?????? ?????? ?????? ???
  const onClickGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccessGetLocation, (e) => {
      setLoding(true);
    });
  };

  const [popupOpened, setPopupOpened] = useState(false);
  const [results, setResults] = useState<
    { description: string; placeId: string }[]
  >([]);
  const location = useSelector((state) => state.registerRoom.location);
  // input?????? debounce ?????? - ?????? ????????? ????????? ????????? ???????????? ??????
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

  // input??? ????????? ?????????
  const onClickInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setPopupOpened(true);
  };

  // ???????????? ????????? ?????? ??????
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

  // ????????? ?????? ?????????
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
      <h2>??????? ???????????? ????????? ???????????????.</h2>
      <h3>4??????</h3>
      <p className="register-room-step-info">
        ????????? ????????? ????????? ???????????? ????????? ????????? ????????? ???????????????.
      </p>
      <div className="register-room-location-wrapper">
        <input
          className="register-room-radio"
          type="radio"
          id="a"
          name="getloc"
          onClick={onSelect}
          defaultChecked //?????? ?????? ?????? ????????? ???????????????
        />
        <label>?????? ?????? ??????</label>
        <input
          className="register-room-radio"
          type="radio"
          id="b"
          name="getloc"
          onClick={onSelect}
        />
        <label>?????? ?????? ????????????</label>
        {selected ? (
          <>
            <Button
              className="register-room-button"
              color="cyan"
              colorReverse
              icon={<NavigationIcon />}
              onClick={onClickGetCurrentLocation}
            >
              {loading ? "???????????? ???.." : "?????? ?????? ????????????"}
            </Button>
            <Input
              label="???/???"
              value={city}
              onChange={onChangeCity}
              readOnly
            />
            <Input
              label="???/???/???"
              value={district}
              onChange={onChangeDistrict}
              readOnly
            />
            <Input
              label="???????????????"
              value={streetAddress}
              onChange={onChangeStreetAddress}
              readOnly
            />
            <Input
              label="????????????"
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
                  placeholder="????????? ?????? ??????????????????."
                  ref={inputRef}
                />
              </div>
              {popupOpened && location !== "????????? ?????? ??????????????????." && (
                <ul className="search-bar-location-results">
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
                    <li>?????? ????????? ????????????.</li>
                  )}
                </ul>
              )}
            </OutsideClickHandler>
          </div>
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
