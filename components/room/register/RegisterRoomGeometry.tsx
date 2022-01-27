import React, { useEffect, useRef } from "react";

import styled from "styled-components";
import { useSelector } from "../../../store";
import throttle from "lodash/throttle";

import palette from "../../../styles/palette";
import { useDispatch } from "react-redux";
import { registerRoomActions } from "../../../store/registerRoom";
import RegisterRoomFooter from "./RegisterRoomFooter";

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
    initMap: () => void;
  }
}

const RegisterRoomGeometry: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const latitude = useSelector((state) => state.registerRoom.latitude);
  const longitude = useSelector((state) => state.registerRoom.longitude);

  const dispatch = useDispatch();

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
        //지도
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
        const getNewMarker = (location: any) => {
          const newMarker = new window.google.maps.Marker({
            position: location,
            map: map,
          });
          map.setCenter(location);
          // map.addListener("center_changed", () => {
          //   window.setTimeout(() => {
          //     map.panTo(newMarker.getPosition() as google.maps.LatLng);
          //   }, 1000);
          // });
        };
        map.addListener("center_changed", () => {
          console.log(map.getCenter()); //왜 아무것도 뜨지 않는거야..?
          const centerLat = map.getCenter().lat;
          const centerLng = map.getCenter().lng;
          // console.log(centerLat, centerLng);

          marker.setPosition({ lat: centerLat, lng: centerLng });
          dispatch(registerRoomActions.setLatitude(centerLat));
          dispatch(registerRoomActions.setLongitude(centerLng));

          window.setTimeout(() => {
            map.panTo(marker.getPosition() as google.maps.LatLng);
          }, 1000);
        });
        // marker.addListener("click", () => {
        //   map.setCenter(marker.getPosition());
        //   // getNewMarker(map.setCenter(marker.getPosition()));
        // });
        //마커
        // if (location) {
        //   const marker = new window.google.maps.Marker({
        //     position: new google.maps.LatLng(location),
        //     map,
        //   });
        // } else {
        // }

        // map.addListener(
        //   "center_changed",
        //   throttle(() => {
        //     //지도 스크롤할 때마다 콘솔에 너무 많이 찍혀서
        //     //스로틀링은 함수가 지정된 시간동안 최대 한번 호출되도록
        //     const centerLat = map.getCenter().lat;
        //     const centerLng = map.getCenter().lng;
        //     console.log(centerLat, centerLng);
        //     //마커의 위치를 바꾼후 redux에 저장하겠음
        //     marker.setPosition({ lat: centerLat, lng: centerLng });
        //     dispatch(registerRoomActions.setLatitude(centerLat));
        //     dispatch(registerRoomActions.setLongitude(centerLng));
        //   }, 150)
        // );
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
        <p>필요한 경우 핀이 정확한 위치에 자리하도록 조정할 수 있어요.</p>
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
