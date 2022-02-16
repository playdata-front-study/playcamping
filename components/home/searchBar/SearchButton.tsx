import Link from 'next/link';
import React from 'react';
import Button from '../../common/Button';
import SearchIcon from '../../../public/static/svg/search/search.svg';
import { useSelector } from '../../../store';
import { makeQueryString } from '../../../lib/utils';

const SearchButton: React.FC = () => {
	const searchRoom = useSelector((state) => state.searchRoom);
	const roomListHref = makeQueryString('/room', searchRoom);

	return (
		<Link href={roomListHref}>
			<a>
				<Button icon={<SearchIcon />} color='cyan' width='89px'>
					검색
				</Button>
			</a>
		</Link>
	);
};

export default SearchButton;
