import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import palette from '../../styles/palette';
import HostRoomDetailPhotos from './HostRoomDetailPhotos';

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
			font-size: 14px;
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
	.room-detatil-bed-type-label {
		font-size: 22px;
		font-weight: 600;
		margin-bottom: 24px;
	}
	.room-detail-bed-type-list {
		display: flex;
		.room-detail-bedroom-card {
			padding: 26px 24px;
			width: 204px;
			margin-right: 16px;
			border: 1px solid ${palette.gray};
			border-radius: 12px;
			svg {
				margin-bottom: 20px;
			}
			.room-detail-bed-card-number {
				font-size: 16px;
				font-weight: 600;
				margin-bottom: 12px;
			}
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

const HostRoomDetail = () => {
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
			<HostRoomDetailPhotos />
		</Container>
	);
};

export default HostRoomDetail;
