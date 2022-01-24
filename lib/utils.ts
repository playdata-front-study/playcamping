// 객체의 값들로 쿼리스트링 만들어주는 함수
export const makeQueryString = (
	baseUrl: string,
	queriesObject: { [key: string]: any }
) => {
	const keys = Object.keys(queriesObject);
	const values = Object.values(queriesObject);
	if (keys.length === 0) {
		return baseUrl;
	}

	let queryString = `${baseUrl}?`;
	keys.forEach((key, i) => {
		if (queriesObject[key]) {
			queryString += `${keys[i]}=${values[i]}`;
		}
	});

	return queryString.slice(0, -1);
};
