import postApi from '@/api/postApi';
import createIcon from '@/assets/plus-circle-fill.svg';
import { PostContext } from '@/store/contexts';
import { getAll, needLoading } from '@/store/reducers/post/postActions';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import ModalAddPost from './ModalAddPost';
import Post from './Post';
import styles from './Posts.module.scss';

const cx = classNames.bind(styles);

const Posts = () => {
  const [state, dispatch] = useContext(PostContext);
  const { posts } = state;
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
    dispatch(needLoading());
    setShowModalAdd(false);
    try {
      const res = await postApi.create(post);
      if (res.success) {
        toast.success(res.message);
        dispatch(getAll({ posts: [...posts, res.post] }));
        setPost({
          title: '',
          description: '',
          url: '',
        });
      } else if (!res.data.success) {
        dispatch(getAll({ posts }));
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log('An unknown error:', error);
    }
  };

  const handleChangePost = (e) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={cx('wrapper')}>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      <img
        onClick={handleShowModalAdd}
        className={cx('create-icon')}
        src={createIcon}
        alt="Create icon"
      />
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

export default Posts;
