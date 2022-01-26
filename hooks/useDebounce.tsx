import { useState } from 'react';
import { useEffect } from 'react';

// input 태그에 onChange 이벤트 걸면 너무 잦은 api 호출 유발.
// input 작성이 끝났을 때 api를 보내도록 debounce 적용
// debounce : 이벤트를 그룹화하여 특정 시간이 지난 후 하나의 이벤트만 발생하도록 하는 기술
const useDebounce = (value: string, delay: number) => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
};

export default useDebounce;

/**
 * 변수 = setTimeout(func, [delay]) : 일정 시간이 지난 후에 함수가 실행되도록 하는 역할
 * func: 실행하고자 하는 함수
 * delay: 실행 전 대기시간 (밀리초 단위, 기본값 0)
 *
 * clearTimeout(변수) : setTimeout을 취소하는 역할
 *
 */
