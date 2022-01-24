import React from "react";
import styled, { css } from "styled-components";
import { useSelector } from "../../store";
import palette from "../../styles/palette";

type InputContainerProps = {
  iconExist: boolean;
  isValid: boolean;
  useValidation: boolean;
};

const Container = styled.div<InputContainerProps>`
  label {
    span {
      display: block;
      margin-bottom: 8px;
    }
  }
  input {
    position: relative;
    width: 100%;
    height: 46px;
    //상우하좌. 위 오른쪽 아래 왼쪽. '위'부터 시계방향
    padding: ${({ iconExist }) => (iconExist ? "0 44px 0 11px " : "0 11px")};
    border: 1px solid ${palette.gray};
    border-radius: 4px;
    font-size: 16px;
    outline: none;
    & ::placeholder {
      color: ${palette.gray};
    }
    & :focus {
      border-color: ${palette.darkgray};
    }
  }
  svg {
    position: absolute;
    right: 11px;
    height: 46px;
  }
  .input-error-message {
    margin-top: 8px;
    font-weight: 600;
    font-size: 14px;
    color: ${palette.pink};
  }
  ${({ useValidation, isValid }) =>
    useValidation &&
    !isValid &&
    css`
      input {
        background-color: ${palette.snow};
        border-color: ${palette.pink};
        & :focus {
          border-color: ${palette.pink};
        }
      }
    `}
  ${({ useValidation, isValid }) =>
    useValidation &&
    isValid &&
    css`
      input {
        border-color: ${palette.darkgray};
      }
    `}
`;

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  label?: string;
  isValid?: boolean;
  useValidation?: boolean;
  errorMessage?: string;
}

const Input: React.FC<IProps> = ({
  label,
  icon,
  isValid = false,
  useValidation = true,
  errorMessage,
  ...props
}) => {
  const validateMode = useSelector((state) => state.common.validateMode);

  return (
    <Container
      iconExist={!!icon}
      isValid={isValid}
      useValidation={validateMode && useValidation}
    >
      {label && (
        <label>
          <span>{label}</span>
          <input {...props} />
        </label>
      )}
      {!label && <input {...props} />}
      {icon}
      {useValidation && validateMode && !isValid && errorMessage && (
        <p className='input-error-message'>{errorMessage}</p>
      )}
    </Container>
  );
};

export default React.memo(Input);
