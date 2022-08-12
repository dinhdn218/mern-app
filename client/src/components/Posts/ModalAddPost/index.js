import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const ModalAddPost = ({
  showModalAdd,
  onCloseModalAdd,
  onSubmit,
  post,
  onChangePost,
}) => {
  const { title, description, url } = post;

  return (
    <Modal show={showModalAdd} onHide={onCloseModalAdd} centered>
      <Form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>What do you want to learn?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title*</Form.Label>
            <Form.Control
              required
              autoFocus
              name="title"
              value={title}
              type="text"
              onChange={onChangePost}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={description}
              onChange={onChangePost}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Url</Form.Label>
            <Form.Control
              placeholder="https://google.com"
              name="url"
              value={url}
              onChange={onChangePost}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModalAdd}>
            Close
          </Button>
          <Button variant="info" type="submit">
            Learn
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalAddPost;
