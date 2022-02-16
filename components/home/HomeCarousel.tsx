import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import palette from "../../styles/palette";
import { useSelector } from "../../store";
import Link from "next/link";

const Container = styled.div`
  width: 100%;
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none; // 슬라이드 클릭시 파란선을 제거하기 위해서 작성
  }
  .slick-prev,
  .slick-next {
    background-color: ${palette.lightgray2};
    border-radius: 10%;
    width: 27px;
    height: 45px;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 429px;
  height: 300px;
  overflow: hidden;
`;

const Image = styled.img`
  /* width: 100%; */
  max-width: 100%;
  height: auto;
  object-fit: cover; //width, height 정해놓고 컨테이너에 꽉차게 하기위해
  border-radius: 15px;
`;

const HomeCarousel: React.FC = () => {
  const settings = {
    dots: true, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 500, // 애미메이션의 속도, 단위는 milliseconds
    slidesToShow: 3, // 한번에 몇개의 슬라이드를 보여줄 지
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    autoplay: true, //자동 스크롤
    pauseOnHover: true, //슬라이드 이동 시 마우스 호버하면 슬라이더 멈추게 설정
    arrows: true, //양옆 버튼
    prevArrow: <button type="button" className="slick-prev"></button>,
    nextArrow: <button type="button" className="slick-next"></button>,
  };

  const rooms = useSelector((state) => state.room.rooms);

  return (
    <Container>
      <StyledSlider {...settings}>
        {rooms.map((room) => {
          return (
            <div key={room.id}>
              <Link href={`/room/${room.id}`}>
                <a>
                  <ImageContainer>
                    <Image src={room.photos[0]} />
                  </ImageContainer>
                </a>
              </Link>
            </div>
          );
        })}
      </StyledSlider>
    </Container>
  );
};

export default HomeCarousel;
