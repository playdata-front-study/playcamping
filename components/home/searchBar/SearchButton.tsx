import Link from 'next/link';
import React from 'react';
import Button from '../../common/Button';
import SearchIcon from '../../../public/static/svg/search/search.svg';
import { useSelector } from '../../../store';
import { makeQueryString } from '../../../lib/utils';

const SearchButton: React.FC = () => {
	const searchSite = useSelector((state) => state.searchSite);
	const siteListHref = makeQueryString('/sites', searchSite);

	return (
		<Link href={siteListHref}>
			<a>
				<Button icon={<SearchIcon />} color='cyan' width='89px'>
					검색
				</Button>
			</a>
		</Link>
	);
};

export default SearchButton;
