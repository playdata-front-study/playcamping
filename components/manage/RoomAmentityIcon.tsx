import React from "react";

interface IProps {
  amentity: string;
}

const RoomAmentityIcon: React.FC<IProps> = ({ amenity }) => {
  const iconUrl = () => {
    switch (amenity) {
      case "무선 인터넷":
        return "/static/svg/room/detail/wifi.svg";
      case "TV":
        return "/static/svg/room/detail/tv.svg";
      case "냉장고":
        return "/static/svg/room/detail/refrigerator.svg";
      case "전기 포트":
        return "/static/svg/room/detail/kettle.svg";
      case "난방":
        return "/static/svg/room/detail/thermometer.svg";
      case "에어컨":
        return "/static/svg/room/detail/ice.svg";
      case "다리미":
        return "/static/svg/room/detail/iron.svg";
      case "샴푸":
        return "/static/svg/room/detail/shampoo.svg";
      case "헤어 드라이어":
        return "/static/svg/room/detail/hair-dryer.svg";
      case "조식, 커피, 차":
        return "/static/svg/room/detail/coffee.svg";
      case "이동식 난로":
        return "/static/svg/room/detail/fireplace.svg";
      case "개인 화장실/샤워실":
        return "/static/svg/room/detail/shower.svg";
      default:
        return "";
    }
  };
  return <img src={iconUrl()} alt="" />;
};

export default RoomAmentityIcon;
