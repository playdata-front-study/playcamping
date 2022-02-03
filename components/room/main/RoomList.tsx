import React from 'react';
import styled from 'styled-components';
import { useSelector } from '../../../store';
import RoomCard from './RoomCard';

const Container = styled.ul`
	display: flex;
	flex-wrap: wrap;
	padding-top: 50px;
	width: 100%;
`;

interface Iprops {
	showMap: boolean;
}

const RoomList: React.FC<Iprops> = ({ showMap }) => {
	const rooms = useSelector((state) => state.room.rooms);

	return (
		<Container>
			{rooms.map((room) => (
				<RoomCard room={room} showMap={showMap} key={room.id} />
			))}
		</Container>
	);
};

export default RoomList;
