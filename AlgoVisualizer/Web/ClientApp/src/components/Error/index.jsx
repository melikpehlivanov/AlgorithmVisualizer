import React, { useContext } from 'react';
import { Alert } from 'react-bootstrap';
import { ErrorContext } from '../../store/context/errorContext';
import { clearErrors } from '../../store/actions/error';

const Error = () => {
  const { state, dispatchError } = useContext(ErrorContext);

  return state.showError ? (
    <Alert
      className="ml-3 mr-3"
      variant="danger"
      onClose={() => dispatchError(clearErrors())}
      dismissible
    >
      <Alert.Heading>Oh snap!</Alert.Heading>
      {state.messages.map((message, i) => {
        return <p key={i}>{message}</p>;
      })}
    </Alert>
  ) : null;
};

export default Error;
