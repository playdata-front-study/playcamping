import { isEmpty } from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { useSelector } from '../../../store';
import palette from '../../../styles/palette';
import RoomAmentityIcon from '../../manage/RoomAmentityIcon';
import RoomDetailPhotos from './RoomDetailPhotos';
import RoomDetailReservation from './RoomDetailReservation';

const Container = styled.div`
	width: 1120px;
	margin: auto;
	padding-top: 26px;
	padding-bottom: 100px;
	.room-detail-title {
		font-size: 26px;
		font-weight: 800;
		margin-bottom: 15px;
	}

	.room-detail-location {
		font-size: 14px;
		font-weight: 600;
		text-decoration: underline;
		color: ${palette.gray};
		margin-bottom: 24px;
	}
	.room-detail-contents {
		display: flex;
		justify-content: space-between;
	}
	.room-detail-infos {
		width: 644px;
		.room-detail-room-type {
			font-size: 22px;
			font-weight: 800;
			margin-bottom: 8px;
		}
		.room-detail-space-counts {
			font-size: 18px;
		}
		.room-detail-divider {
			width: 100%;
			height: 1px;
			background-color: ${palette.gray};
			margin: 32px 0;
		}
		.room-detail-description {
			white-space: break-spaces;
			word-break: keep-all;
		}
	}

	.room-detatil-conveniences-label {
		font-size: 22px;
		font-weight: 600;
		margin-bottom: 24px;
	}
	.room-detatil-conveniences-list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		li {
			display: flex;
			align-items: center;
			width: 50%;
			margin-bottom: 16px;
			img {
				margin-right: 16px;
			}
		}
	}
`;

const RoomDetail = () => {
	const room = useSelector((state) => state.room.detail);

	if (!room) {
		return null;
	}

	return (
		<Container>
			<h1 className='room-detail-title'>{room.title}</h1>
			<p className='room-detail-location'>
				{room.city}, {room.district}
			</p>
			<RoomDetailPhotos />
			<section className="room-detail-contents">
        <div className="room-detail-infos">
          <p className="room-detail-room-type">
            {room.host.lastname}님이 호스팅하는 {room.campingType}
          </p>
          <p className="room-detail-space-counts">
            최대 인원 {room.maximumGuestCount}명
          </p>
          <div className="room-detail-divider" />
          <p className="room-detail-description">{room.description}</p>
          <div className="room-detail-divider" />
     
          {!isEmpty(room.amenities) && (
            <>
              <p className="room-detatil-conveniences-label">편의시설</p>
              <ul className="room-detatil-conveniences-list">
                {room.amenities.map((amenity, index) => (
                  <li key={index}>
                    <RoomAmentityIcon amenity={amenity} />
                    {amenity}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <RoomDetailReservation />
      </section>
		</Container>
	);
};

export default RoomDetail;
