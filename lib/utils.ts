//"token=value" 를 {token:"value"}로 바꾸는 함수
export const cookieStringToObject = (cookieString: string | undefined) => {
	const cookies: { [key: string]: string } = {};
	if (cookieString) {
		//* "token=value"
		const itemString = cookieString?.split(/\s*;\s*/);
		itemString.forEach((pairs) => {
			//* ["token","value"]
			const pair = pairs.split(/\s*=\s*/);
			cookies[pair[0]] = pair.splice(1).join('=');
		});
	}
	return cookies;
};

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
			queryString += `${keys[i]}=${values[i]}&`;
		}
	});

	return queryString.slice(0, -1);

};

//* 금액을 입력하면 금액에 ,를 넣어주는 함수
export const makeMoneyString = (input: string) => {
	const amountString = input.replace(/[^0-9]/g, '');
	if (amountString) {
		return parseInt(amountString, 10).toLocaleString();
	}
	return '';
};
