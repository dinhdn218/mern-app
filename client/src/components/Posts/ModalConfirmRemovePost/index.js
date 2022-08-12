import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalConfirmRemovePost = ({
  showModalDelete,
  onCloseModalDelete,
  onDeletePost,
  deletedPostId,
}) => {
  return (
    <Modal show={showModalDelete} centered onHide={onCloseModalDelete}>
      <Modal.Header closeButton>
        <Modal.Title>Do you want to delete?</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, bye!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseModalDelete}>
          No
        </Button>
        <Button
          onClick={(e) => onDeletePost(e, deletedPostId)}
          variant="info"
          type="submit"
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirmRemovePost;
