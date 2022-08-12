import postApi from '@/api/postApi';
import Posts from '@/components/Posts';
import ModalAddPost from '@/components/Posts/ModalAddPost';
import Waiting from '@/components/Waiting';
import { AuthContext, PostContext } from '@/store/contexts';
import { create, getAll, needLoading } from '@/store/reducers/post/postActions';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { toast } from 'react-toastify';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

const Home = () => {
  const [postState, postDispatch] = useContext(PostContext);
  const { postLoading, posts } = postState;
  const [authState] = useContext(AuthContext);
  const {
    user: { username },
  } = authState;

  const [showModalAdd, setShowModalAdd] = useState(false);
  const [post, setPost] = useState({
    title: '',
    description: '',
    url: '',
  });

  const handleCloseModalAdd = () => {
    setPost({
      title: '',
      description: '',
      url: '',
    });
    setShowModalAdd(false);
  };

  const handleShowModalAdd = () => setShowModalAdd(true);

  const handleSubmitModalAdd = async (event) => {
    event.preventDefault();
    postDispatch(needLoading());
    setShowModalAdd(false);
    try {
      const res = await postApi.create(post);
      if (res.success) {
        toast.success(res.message);
        postDispatch(create(res.post));
        setPost({
          title: '',
          description: '',
          url: '',
        });
      } else if (!res.data.success) {
        postDispatch(getAll(posts));
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log('An unknown error:', error);
    }
  };

  const handleChangePost = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  let body;
  if (postLoading) {
    body = <Waiting waiting={true} />;
  } else if (posts.length > 0) {
    body = <Posts handleShowModalAdd={handleShowModalAdd} />;
  } else
    body = (
      <Card className="text-center">
        <Card.Header as="h1">Hi {username}</Card.Header>
        <Card.Body>
          <Card.Title as="h2">Welcome to LearnIt</Card.Title>
          <Card.Text>
            Click the button below to track your first skill to learn.
          </Card.Text>
          <Button onClick={handleShowModalAdd} variant="info">
            LearnIt!
          </Button>
        </Card.Body>
      </Card>
    );
  return (
    <div className={cx('wrapper')}>
      {body}
      <ModalAddPost
        showModalAdd={showModalAdd}
        post={post}
        onCloseModalAdd={handleCloseModalAdd}
        onSubmit={handleSubmitModalAdd}
        onChangePost={handleChangePost}
      />
    </div>
  );
};

export default Home;
