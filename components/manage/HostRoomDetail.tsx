import { isEmpty } from 'lodash';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Button from '../common/Button';
import HostRoomDetailPhotos from './HostRoomDetailPhotos';
import CustomizedTables from './ReservationTable';

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
  .room-detail-contents {
    display: flex;
    justify-content: space-between;
  }

	.reservation-card-cancel-button{
		margin-top: 100px;
	}
`;

const HostRoomDetail = () => {
	const room = useSelector((state) => state.room.detail);
	const reservations = useSelector((state) => state.reservation.roomReservations);
	
	const deleteRoom = async (reservationId:number) => {
		try {
			await deleteRoomAPI(room.id);
			alert('예약이 취소되었습니다.');
			router.push('/reservation');
		}catch(e){
			console.log(e);
		}
	};

	if (!room) {
		return null;
	}
	console.log("캠핑장 관리 상세페이지")
	console.log(reservations)

	return (
		<Container>
			<h1 className='room-detail-title'>{room.title}</h1>
			<HostRoomDetailPhotos />
			{!isEmpty(reservations)? 
			(<CustomizedTables reservations={reservations} roomPrice={room.price}/> )
			:"예약내역이 없습니다."}

			<Button
				className='reservation-card-cancel-button'
				color='cyan'
				width='89px'
				onClick={deleteRoom}
			>
				삭제하기
			</Button>
		</Container>
	);
};

export default HostRoomDetail;
