/**앞에서 구한 값들을 이용하여 각 단계별로 유효한지, 진행중인 단계인지 값을 전달하여
 * 활성, 비활성, 혹은 진행 중인 상태임을 나타내도록 하겠음
 */
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import CheckMarkIcon from "../../../public/static/svg/register/pink_check_mark.svg";
import Button from "../../common/Button";
import palette from "../../../styles/palette";

const Container = styled.div`
  display: inline-block;
  padding: 16px 0;

  a {
    display: flex;
    align-items: center;

    svg {
      margin-right: 12px;
    }

    span {
      font-size: 16px;
      font-weight: 600;
      text-decoration: underline;
    }
  }
  &:link {
    text-decoration-line: none;
  }
  .register-room-check-step-in-progress {
    //아직 진행중인 단계
    margin-left: 28px;
  }
  .register-room-check-step-continue-button {
    //그 페이지로 넘어가게 하는 버튼
    margin: 8px 0 0 28px;
  }
  .disabled-step {
    //아직 유효하지 않은 단계는 회색
    margin-left: 28px;
    font-size: 16px;
    color: ${palette.gray};
  }
  .checked-step {
    svg {
      width: 18px;
    }
  }
`;

interface IProps {
  disabled: boolean;
  inProgress: boolean;
  step: string;
  href: string;
}

const RegisterRoomCheckStep: React.FC<IProps> = ({
  disabled,
  inProgress,
  step,
  href,
}) => {
  if (inProgress) {
    //아직 진행중인 단계는 ~~~
    return (
      <Container>
        <Link href={href}>
          <a className="register-room-check-step-in-progress">
            <span>{step}</span>
          </a>
        </Link>
        {/* <Link href={href}>
          <a className='register-room-check-step-continue-button'>
            <Button color='cyan' size='small' width='55px'>
              계속
            </Button>
          </a>
        </Link> */}
      </Container>
    );
  }
  if (disabled) {
    //유효하지 않은 단계는~~~
    return (
      <Container>
        <Link href={href}>
          <a className="disabled-step">{step}</a>
        </Link>
      </Container>
    );
  }
  return (
    <Container>
      <Link href={href}>
        <a className="checked-step">
          <CheckMarkIcon />
          <span>{step}</span>
        </a>
      </Link>
    </Container>
  );
};

export default RegisterRoomCheckStep;
