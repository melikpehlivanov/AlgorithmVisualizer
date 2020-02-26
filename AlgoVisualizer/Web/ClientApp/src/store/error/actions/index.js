import {
  SHOW_ERROR_WITH_MESSAGE,
  CLEAR_ERRORS
} from '../../../constants/errorConstants';

export const showError = (show, messages) => {
  return {
    type: SHOW_ERROR_WITH_MESSAGE,
    payload: { show, messages }
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
