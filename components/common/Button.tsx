import React from "react";
import styled, { css } from "styled-components";
import palette from "../../styles/palette";

//버튼 색상 구하기
const getButtonColor = (color: string, colorReverse: boolean) => {
  if (colorReverse) {
    switch (color) {
      case "darkgray":
        return css`
          border: 2px solid ${palette.darkgray};
          color: ${palette.darkgray};
          background-color: white;
        `;
      case "cyan":
        return css`
          border: 2px solid ${palette.cyan};
          color: ${palette.cyan};
          background-color: white;
        `;
      default:
        return css`
          border: 2px solid ${palette.black};
          color: ${palette.black};
          background-color: white;
        `;
    }
  }
  switch (color) {
    case "darkgray":
      return css`
        background-color: ${palette.darkgray};
        color: white;
      `;
    case "pink":
      return css`
        background-color: ${palette.pink};
        color: white;
      `;
    case "cyan":
      return css`
        background-color: ${palette.cyan};
        color: white;
      `;
    default:
      return css`
        background-color: white;
        color: ${palette.black};
        border: 1px solid ${palette.gray};
      `;
  }
};

//버튼 크기 구하기
const getButtonSize = (size: "small" | "medium") => {
  switch (size) {
    case "medium":
      return css`
        height: 48px;
      `;
    case "small":
      return css`
        font-size: 12px; //책대로 14로 했떠니 줄바뀜
        height: 36px;
      `;
    default:
      return "";
  }
};

interface StyledButtonProps {
  width: string | undefined;
  colorReverse: boolean;
  size: "small" | "medium";
}

const Container = styled.button<StyledButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 15px;
  border: 0;
  border-radius: 4px;
  /* font-size: 15px; */
  font-weight: 700;
  outline: none;
  cursor: pointer;
  width: ${(props) => props.width};
  ${(props) => getButtonColor(props.color || "", props.colorReverse)};
  ${(props) => getButtonSize(props.size)};

  svg {
    margin-right: 12px;
    width: 20px;
  }
`;

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: "darkgray" | "white" | "cyan" | "pink";
  width?: string;
  colorReverse?: boolean;
  icon?: JSX.Element;
  size?: "small" | "medium";
}

const Button: React.FC<IProps> = ({
  children,
  color,
  width,
  colorReverse = false,
  icon,
  size = "medium",
  ...props
}) => {
  return (
    <Container
      {...props}
      color={color}
      width={width}
      colorReverse={colorReverse}
      size={size}
    >
      {icon}
      {children}
    </Container>
  );
};

export default React.memo(Button);
