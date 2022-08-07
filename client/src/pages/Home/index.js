import postApi from '@/api/postApi';
import Waiting from '@/components/Waiting';
import { AuthContext, PostContext } from '@/store/contexts';
import { getAll } from '@/store/reducers/post/postActions';
import classNames from 'classnames/bind';
import { useContext, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './Home.module.scss';
import { toast } from 'react-toastify';
import Posts from '@/components/Posts';

const cx = classNames.bind(styles);

const Home = () => {
  const [postState, postDispatch] = useContext(PostContext);
  const [authState] = useContext(AuthContext);
  const { postLoading, posts } = postState;
  const {
    user: { username },
  } = authState;

  console.log(postState);

  const getPosts = async () => {
    try {
      const response = await postApi.getAll();
      console.log(response);
      if (response.success) {
        postDispatch(getAll({ posts: response.posts }));
      } else if (!response.data.success) {
        postDispatch(getAll({ posts: [] }));
        toast.error(response.data.message);
      }
    } catch (error) {
      postDispatch(
        getAll({
          posts: [],
        }),
      );
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let body;
  if (postLoading) {
    body = <Waiting waiting={true} />;
  } else if (posts.length > 0) {
    body = <Posts posts={posts} />;
  } else
    body = (
      <Card className="text-center">
        <Card.Header as="h1">Hi {username}</Card.Header>
        <Card.Body>
          <Card.Title as="h2">Welcome to LearnIt</Card.Title>
          <Card.Text>
            Click the button below to track your first skill to learn.
          </Card.Text>
          <Button variant="info">LearnIt!</Button>
        </Card.Body>
      </Card>
    );
  return <div className={cx('wrapper')}>{body}</div>;
};

export default Home;
