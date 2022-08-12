import classNames from 'classnames/bind';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import styles from './Post.module.scss';
import playIcon from '@/assets/play-btn.svg';
import Button from 'react-bootstrap/Button';
import removeIcon from '@/assets/trash.svg';
import updateIcon from '@/assets/pencil.svg';
import { POST_STATUS } from '@/constants/common';

const cx = classNames.bind(styles);

const Post = ({ post, onShowModalUpdate, onShowModalDelete }) => {
  const { _id, title, description, status, url } = post;

  const color =
    status === POST_STATUS.TO_LEARN
      ? 'warning'
      : status === POST_STATUS.LEARNING
      ? 'info'
      : 'success';

  return (
    <div className={cx('wrapper')}>
      <Card border={color} className={cx('card')}>
        <Card.Header as="h3">{title}</Card.Header>
        <Card.Body>
          <Card.Text>{description}</Card.Text>
          <Badge bg={color}>{status}</Badge>
        </Card.Body>
        <Card.Footer
          className={`${cx(
            'wrapper-footer',
          )} text-muted d-flex justify-content-end`}
        >
          <Nav.Link target="_blank" href={url}>
            <img src={playIcon} alt="Play icon" />
          </Nav.Link>
          <Button
            onClick={onShowModalUpdate(post)}
            active
            variant="outline-light"
          >
            <img src={updateIcon} alt="Update icon" />
          </Button>
          <Button
            onClick={onShowModalDelete(_id)}
            active
            variant="outline-light"
          >
            <img src={removeIcon} alt="Remove icon" />
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default Post;
