import React, { useEffect, useRef, useState } from "react";

import styled from "styled-components";
import { useSelector } from "../../../store";

import palette from "../../../styles/palette";
import { useDispatch } from "react-redux";
import { registerRoomActions } from "../../../store/registerRoom";
import RegisterRoomFooter from "./RegisterRoomFooter";
import { getLocationInfoAPI } from "../../../lib/api/map";

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
  .register-room-geometry-map-wrapper {
    width: 555px;
    height: 300px;
    margin-top: 24px;
    > div {
      width: 100%;
      height: 100%;
    }
  }
  .register-room-geometry-map-newpin {
    color: ${palette.pink};
    font-weight: bold;
  }
`;

//* 구글 지도 script 불러오기
//url의 query를 살펴보면 key를 전달하고, callback으로 initMap을 전달하고 있음
//지도를 불렀을 때 window.initMap이라는 함수를 실행하도록 설정됨
//window.initMap이라는 함수에 지도가 만들어질 수 있게 설정하여 지도가 생성되도록 함
//그전에 google map api를 편히 사용할 수 있게 google map api의 type을 다운받도록 하겠다
//yarn add @types/googlemaps -D
const loadMapScript = () => {
  return new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}&callback=initMap`;
    script.defer = true;
    document.head.appendChild(script);
    script.onload = () => {
      resolve();
    };
  });
};

declare global {
  interface Window {
    google: any;
    initMap: () => void; //아무것도 반환하지 않아..?
  }
}

const RegisterRoomGeometry: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const latitude = useSelector((state) => state.registerRoom.latitude);
  const longitude = useSelector((state) => state.registerRoom.longitude);

  const dispatch = useDispatch();

  const markers: Array<object> = [];

  const [loading, setLoding] = useState(false);

  //new 마커 찍기에 성공했을때
  const onSuccessNewLocation = async (newLat: number, newLng: number) => {
    try {
      const { data: currentLocation } = await getLocationInfoAPI({
        latitude: newLat,
        longitude: newLng,
      });
      dispatch(registerRoomActions.setCountry(currentLocation.country));
      dispatch(registerRoomActions.setCity(currentLocation.city));
      dispatch(registerRoomActions.setDistrict(currentLocation.district));
      dispatch(
        registerRoomActions.setStreetAddress(currentLocation.streetAddress)
      );
      dispatch(registerRoomActions.setPostcode(currentLocation.postcode));
      dispatch(registerRoomActions.setLatitude(currentLocation.latitude));
      dispatch(registerRoomActions.setLongitude(currentLocation.longitude));
      // console.log(currentLocation.city); //도시 잘 바뀌는거 확인
    } catch (e) {
      console.log(e);
    }
    setLoding(false);
  };

  const loadMap = async () => {
    await loadMapScript();
  };

  /**
   * Google Map API 주소의 callback 파라미터와 동일한 이름의 함수이다.
   * Google Map API에서 콜백으로 실행시킨다.
   */
  //dynamic 쓰면 된다더니... 난 안되서 if(typeof window !== 'undefined') 붙임
  if (typeof window !== "undefined") {
    window.initMap = () => {
      //*지도 불러오기
      if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: {
            lat: latitude || 37.5666784,
            lng: longitude || 126.9778436,
          },
          zoom: 15,
        });
        const marker = new window.google.maps.Marker({
          position: {
            lat: latitude || 37.5666784,
            lng: longitude || 126.9778436,
          },
          map,
        });
        // console.log(typeof marker); //object
        markers.push(marker);
        console.log(latitude, longitude); //원래 찍혀있던 마커 37.5482093 127.179438

        window.google.maps.event.addListener(map, "click", (e: any) => {
          const newMarker = new window.google.maps.Marker({
            map,
            position: new window.google.maps.LatLng(e.latLng), //그냥 e.latLng로 하면 안 되더라
          });

          markers.push(newMarker); //새 마커를 markers 배열에 넣고,
          markers.shift(); //배열의 첫번째 요소를 삭제

          map.setCenter(newMarker.getPosition()); // 부드럽게 이동하는건 안댐.....

          const newLat = newMarker.getPosition().lat();
          const newLng = newMarker.getPosition().lng();
          console.log(newLat, newLng); //37.54661010607772 127.18362224606327 // 128라인이랑 다른거 확인

          onSuccessNewLocation(newLat, newLng); //새 마커가 찍힌 곳으로 위치정보도 수정하기
        });
      }
    };
  }

  useEffect(() => {
    loadMap();
  }, []);

  return (
    <>
      <Container>
        <h2>📌핀이 놓인 위치가 정확한가요?</h2>
        <h3>2.5단계</h3>
        <p>
          필요한 경우 핀이 정확한 위치에 자리하도록 지도에{" "}
          <span className='register-room-geometry-map-newpin'>새 핀</span>을
          꽂아주세요.🎯🎯
        </p>
        <div className='register-room-geometry-map-wrapper'>
          <div ref={mapRef} id='map' />
        </div>
        <RegisterRoomFooter
          prevHref='/room/register/location'
          nextHref='/room/register/photo'
        />
      </Container>
    </>
  );
};

export default RegisterRoomGeometry;
