import { showError } from '../store/error/actions';

const errorMessage = 'Something terribly went wrong! Please try again later.';

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
      dispatchError(showError(true, [errorMessage]));
    }
  } catch (error) {
    dispatchError(showError(true, [errorMessage]));
  }
};
