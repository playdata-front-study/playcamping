import React from 'react';
import styled from 'styled-components';
import { useSelector } from '../../store';
import ManageCard from './ManageCard';

const Container = styled.div`
	width: 100%;
	padding: 0 80px;

	h2 {
		width: 480px;
		margin: 80px 0 60px;
		font-size: 36px;
	}
`;

const ManageMain: React.FC = () => {
	const hostRooms = useSelector((state) => state.room.rooms);

	return (
		<Container>
			<h2>캠핑장 관리</h2>
			{hostRooms.map((v, idx) => (
				<ManageCard hostRoom={v} key={idx} />
			))}
		</Container>
	);
};

export default ManageMain;
