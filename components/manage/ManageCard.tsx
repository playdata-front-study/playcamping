import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { RoomType } from '../../types/room';
import Link from 'next/link';
import { useSelector } from '../../store';

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

interface Iprops {
	hostRoom: RoomType;
}

const ManageCard: React.FC<Iprops> = ({ hostRoom }) => {
	const reservations = useSelector(
		(state) => state.reservation.userReservations
	);
	
	return (
		<Container>
			<Link href={`/manage/${hostRoom.id}`}>
			<div className='reservation-card'>
				<div className='reservation-card-photo-wrapper'>
					{<img src={hostRoom.photos[0]} alt='' />}
				</div>
				<div className='reservation-card-info'>
					<p className='reservation-card-info-title'>
						{hostRoom.title}
					</p>
					<p className='reservation-card-info-location'>
						{hostRoom.city} {hostRoom.district}
					</p>

					{hostRoom.reservation.map((v) => (
						<p className='reservation-card-info-dates'>
							{v.checkInDate.split('T')[0]} ~{' '}
							{v.checkOutDate.split('T')[0]}

							(성인 {v.adultCount}명, 아동 {v.childrenCount}명)
						</p>

					))}
				</div>
			</div>
			</Link>
		</Container>
	);
};

export default ManageCard;
