import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { commonActions } from "../store/common";

const useValidateMode = () => {
  const validateMode = useSelector((state) => state.common.validateMode);

  const dispatch = useDispatch();

  const setValidateMode = (value: boolean) => {
    dispatch(commonActions.setValidateMode(value));
  };
  return { validateMode, setValidateMode };
};

export default useValidateMode;
