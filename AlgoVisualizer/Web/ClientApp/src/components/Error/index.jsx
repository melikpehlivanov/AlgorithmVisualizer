import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { showError } from '../../actions/error';

export class Error extends Component {
  render() {
    const { messages, showError, setShow } = this.props;
    return showError ? (
      <Alert
        className="ml-3 mr-3"
        variant="danger"
        onClose={() => setShow(false)}
        dismissible
      >
        <Alert.Heading>Oh snap!</Alert.Heading>
        {messages.map((message, i) => {
          return <p key={i}>{message}</p>;
        })}
      </Alert>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    messages: state.error.messages,
    showError: state.error.showError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setShow: (show, message) => {
      dispatch(showError(show, message));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);
