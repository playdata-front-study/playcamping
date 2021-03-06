import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { format } from 'date-fns';
import MapIcon from '../../../public/static/svg/room/main/map.svg';
import palette from '../../../styles/palette';
import { useSelector } from '../../../store';
import RoomList from './RoomList';
import dynamic from 'next/dynamic';

const Container = styled.div<{ showMap: boolean }>`
	padding: 50px 80px;
	margin: auto;

	${({ showMap }) =>
		showMap &&
		css`
			width: 840px;
			margin: 0;
		`};
	.room-list-info {
		margin-bottom: 8px;
	}
	.room-list-title {
		font-size: 32px;
		font-weight: 800;
		margin-bottom: 24px;
	}
	.room-list-buttons {
		display: flex;
		justify-content: space-between;
		align-items: center;
		.room-list-buttons-left-side {
			display: flex;
			button {
				height: 36px;
				padding: 0 16px;
				margin-right: 8px;
				border-radius: 30px;
				border: 1px solid ${palette.lightgray};
				background-color: white;
				cursor: pointer;
				outline: none;
				&:hover {
					border-color: ${palette.black};
				}
			}
		}
		.room-list-show-map-button {
			display: flex;
			align-items: center;
			height: 42px;
			padding: 12px;
			background-color: white;
			border-radius: 8px;
			border: 0;
			background-color: white;
			cursor: pointer;
			outline: none;

			&:hover {
				background-color: ${palette.whitegray};
			}
			svg {
				margin-right: 8px;
			}
		}
	}

	.room-list-wrapper {
		display: flex;
	}
`;

const RoomMain: React.FC = () => {
	const rooms = useSelector((state) => state.room.rooms);
	const checkInDate = useSelector((state) => state.searchRoom.checkInDate);
	const checkOutDate = useSelector((state) => state.searchRoom.checkOutDate);

	const [showMap, setShowMap] = useState(false);

	const getRoomListInfo = `${
		checkInDate
			? `${checkInDate ? format(new Date(checkInDate), 'MM월 dd일') : ''}`
			: ''
	} ${
		checkInDate
			? `${checkOutDate ? format(new Date(checkOutDate), '- MM월 dd일') : ''}`
			: ''
	} 
  `;

	const RoomListMap = dynamic(() => import('./RoomListMap'), { ssr: false });
	// next의 dynamic : 모듈을 빌드 타임이 아닌 런타임에 불러오도록 함. 초기 로딩부터 사용하지 않는 부분을 분리함으로써 퍼포먼스 향상

	return (
		<Container showMap={showMap}>
			<p className='room-list-info'>{getRoomListInfo}</p>
			<h1 className='room-list-title'>{rooms.length}개의 캠핑장</h1>
			<div className='room-list-buttons'>
				<div className='room-list-buttons-left-side'>
					{/* <button type='button'>숙소 유형</button> */}
					<button type='button'>요금</button>
				</div>
				{!showMap && (
					<button
						type='button'
						className='room-list-show-map-button'
						onClick={() => {
							setShowMap(!showMap);
						}}>
						<MapIcon /> 지도 표시하기
					</button>
				)}
			</div>
			<div className='room-list-wrapper'>
				<RoomList showMap={showMap} />
				{showMap && <RoomListMap showMap={showMap} setShowMap={setShowMap} />}
			</div>
		</Container>
	);
};

export default RoomMain;
