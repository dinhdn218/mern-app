import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import styles from './ModalAddPost.module.scss';

const cx = classNames.bind(styles);

const ModalAddPost = ({ showModalAdd, onCloseModalAdd, onSubmit }) => {
  const [postAddForm, setPostAddForm] = useState({
    title: '',
    description: '',
    url: '',
  });

  const { title, description, url } = postAddForm;

  const handleChangePostAddForm = (event) => {
    setPostAddForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  console.log(postAddForm);

  return (
    <div className={cx('wrapper')}>
      <Modal show={showModalAdd} onHide={onCloseModalAdd} centered>
        <Modal.Header closeButton>
          <Modal.Title>What do you want to learn?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title*</Form.Label>
              <Form.Control
                required
                autoFocus
                name="title"
                value={title}
                type="text"
                onChange={handleChangePostAddForm}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                name="description"
                value={description}
                onChange={handleChangePostAddForm}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Url</Form.Label>
              <Form.Control
                required
                placeholder="https://google.com"
                name="url"
                value={url}
                onChange={handleChangePostAddForm}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseModalAdd}>
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit} type="submit">
            Learn
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddPost;
