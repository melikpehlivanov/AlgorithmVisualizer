import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { ErrorContext } from '../../store/error/context';
import { clearErrors } from '../../store/error/actions';

export const Error = () => {
  const { state, dispatchError } = useContext(ErrorContext);

  return state.showError ? (
    <Alert
      className="ml-3 mr-3"
      variant="danger"
      onClose={() => dispatchError(clearErrors())}
      dismissible
    >
      <Alert.Heading>Oh snap!</Alert.Heading>
      {state.messages.length === 1 ? (
        <p>{state.messages[0]}</p>
      ) : (
        state.messages.map((element, i) => <p key={i}>{element}</p>)
      )}
    </Alert>
  ) : null;
};
