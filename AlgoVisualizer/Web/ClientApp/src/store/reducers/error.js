import {
  SHOW_ERROR_WITH_MESSAGE,
  CLEAR_ERRORS
} from '../../constants/errorConstants';
import { initialState } from '../context/errorContext';

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR_WITH_MESSAGE:
      return {
        ...state,
        showError: action.payload.show,
        messages: action.payload.messages
      };
    case CLEAR_ERRORS:
      state = initialState;
      return state;
    default:
      return state;
  }
};

export default errorReducer;
