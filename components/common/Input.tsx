import React from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';

const Container = styled.div<{iconExist:boolean}>`
  input{
    position: relative;
    width: 100%;
    height: 46px;
    padding: ${({iconExist}) => (iconExist? "0 44px 0 11px" : "0 11px")};
    border: 1px solid ${palette.gray};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    ::placeholder{
      color: ${palette.gray}
    }
    //CSS는 같은 속성을 여러 번 정의했을 때, 나중에 설정한 값이 적용됩니다. 
    //만약 나중에 설정한 값이 적용되지 않게 하려면 속성값 뒤에 !important를 붙입니다.
    & :focus{
      border-color: ${palette.darkgray} !important;
    }
  }
  .input-icon-wrapper{
    position: absolute;
    top: 0;
    right: 11px;
    height: 46px;
    display: flex;
    align-items: center;
  }

`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement>{
  icon?: JSX.Element;
}

const Input: React.FC<IProps> = ({icon, ...props}) => {
  return (
    // icon을 평가해서 boolean으로 바꿔주는 것입니다.??(부정 2번 중첩)
   <Container iconExist={!!icon}>
     <input {...props}/>
     <div className='input-icon-wrapper'>{icon}</div>
   </Container>

  );
};

export default Input;