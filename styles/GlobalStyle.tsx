import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';
import palette from './palette';

// reset: html 태그들의 기본 스타일을 제거해줌. yarn add styled-reset
const globalStyle = css`
	${reset};

	* {
		box-sizing: border-box;
	}

	body {
		font-family: Noto Sans, Noto Sans KR;
		color: ${palette.black};
	}
`;

const GlobalStyle = createGlobalStyle`
  ${globalStyle}
`;

export default GlobalStyle;
