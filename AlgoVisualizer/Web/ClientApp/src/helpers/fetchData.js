import { showError } from '../store/error/actions';
import { DEFAULT_ERROR_MESSAGE } from '../constants/errorConstants';

export const makePostApiCallAsync = async (url, data, dispatchError) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: data
    });

    const result = response.json();
    if (response.status <= 400) {
      return result;
    } else {
      dispatchError(showError([DEFAULT_ERROR_MESSAGE]));
    }
  } catch (error) {
    dispatchError(showError([DEFAULT_ERROR_MESSAGE]));
  }
};
