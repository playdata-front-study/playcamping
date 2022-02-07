import React from 'react';
import styled from 'styled-components';
import { differenceInDays } from 'date-fns/differenceInDays';
import { DynamoDBStreams } from 'aws-sdk';
import { makeMoneyString } from '../../lib/utils';
import palette from '../../styles/palette';
import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { reservationActions } from '../../store/reservation';
import { useRouter } from 'next/router';

const Container = styled.div`
	width: 100%;
	border-radius: 10px;
	margin-bottom: 30px;
	box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);

	.reservation-card {
		height: 250px;
		border-radius: 10px;
		overflow: hidden;
		display: flex;
		justify-content: space-between;
		align-items: middle;

		.reservation-card-photo-wrapper {
			width: 30%;
			min-width: 300px;
			height: 250px;
			overflow: hidden;
			img {
				width: 300px;
				height: 250px;
			}
		}

		.reservation-card-info {
			width: 70%;
			text-align: left;
			margin-left: 20px;
			padding: 20px;
			p {
				margin-bottom: 10px;
			}

			.reservation-card-info-title {
				font-size: 24px;
				font-weight: 600;
			}
			.reservation-card-info-location {
				font-size: 14px;
				color: ${palette.gray};
				margin-bottom: 20px;
			}
			.reservation-card-info-price {
				font-weight: 600;
				margin-top: 24px;
			}
			.reservation-card-cancel-button {
				float: right;
			}
		}
	}
`;

const ReservationCard: React.FC = ({ reservation }) => {
	const days =
		new Date(reservation.checkOutDate).getDate() -
		new Date(reservation.checkInDate).getDate();

	const dispatch = useDispatch();
	const router = useRouter();
	const cancelReservation = async (reservationId:number) => {
		try {
			await deleteReservationAPI(reservationId);
			alert('예약이 취소되었습니다.');
			router.push('/reservation');
		}catch(e){
			console.log(e);
		}
	};

	return (
		<Container>
			<div className='reservation-card'>
				<div className='reservation-card-photo-wrapper'>
					{<img src={reservation.room.photos[0]} alt='' />}
				</div>
				<div className='reservation-card-info'>
					<p className='reservation-card-info-title'>
						{reservation.room.title}
					</p>
					<p className='reservation-card-info-location'>
						{reservation.room.city} {reservation.room.district}
					</p>
					<p className='reservation-card-info-dates'>
						{reservation.checkInDate.split('T')[0]} ~{' '}
						{reservation.checkOutDate.split('T')[0]}
					</p>
					<p className='reservation-card-info-guests'>
						성인 {reservation.adultCount}명, 아동 {reservation.childrenCount}명
					</p>
					<p className='reservation-card-info-price'>
						총 {makeMoneyString(String(days * reservation.room.price))}원 /{' '}
						{days}박
					</p>
					<Button
						className='reservation-card-cancel-button'
						color='cyan'
						width='89px'>
						예약 취소
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default ReservationCard;
