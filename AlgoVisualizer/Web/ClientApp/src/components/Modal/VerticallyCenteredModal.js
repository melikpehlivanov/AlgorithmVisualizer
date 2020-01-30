const VerticallyCenteredModal = props => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body dangerouslySetInnerHTML={props.body} />
      <Modal.Footer>
        <div className="mr-auto">
          <Button onClick={props.onHide}>Skip tutorial</Button>
        </div>
        <Button onClick={props.previousPage}>Previous</Button>
        {props.currentPage === props.totalPages ? (
          <Button variant="success" onClick={props.onHide}>
            Finish
          </Button>
        ) : (
          <Button onClick={props.nextPage}>Next</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default VerticallyCenteredModal;
