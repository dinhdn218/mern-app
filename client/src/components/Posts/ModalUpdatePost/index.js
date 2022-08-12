import { POST_STATUS } from '@/constants/common';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalUpdatePost = ({
  showModalUpdate,
  onCloseModalUpdate,
  updatedPost,
  onUpdatePost,
  onChangeUpdatedPost,
}) => {
  const { _id, title, description, url, status } = updatedPost;

  return (
    <Modal show={showModalUpdate} onHide={onCloseModalUpdate} centered>
      <Form>
        <Modal.Header closeButton>
          <Modal.Title>Making progress?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title*</Form.Label>
            <Form.Control
              required
              autoFocus
              name="title"
              type="text"
              value={title}
              onChange={onChangeUpdatedPost}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={description}
              onChange={onChangeUpdatedPost}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Url</Form.Label>
            <Form.Control
              placeholder="https://google.com"
              name="url"
              value={url}
              onChange={onChangeUpdatedPost}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Progress</Form.Label>
            <Form.Select
              onChange={onChangeUpdatedPost}
              name="status"
              defaultValue={status}
            >
              <option value={POST_STATUS.TO_LEARN}>To Learn</option>
              <option value={POST_STATUS.LEARNING}>Learning</option>
              <option value={POST_STATUS.LEARNED}>Learned</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModalUpdate}>
            Close
          </Button>
          <Button
            variant="info"
            type="submit"
            onClick={(e) => onUpdatePost(e, _id)}
          >
            Save changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalUpdatePost;
