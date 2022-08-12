import createIcon from '@/assets/plus-circle-fill.svg';
import { PostContext } from '@/store/contexts';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import ModalUpdatePost from './ModalUpdatePost';
import Post from './Post';
import styles from './Posts.module.scss';
import {
  needLoading,
  update,
  getAll,
  remove,
} from '@/store/reducers/post/postActions';
import postApi from '@/api/postApi';
import { toast } from 'react-toastify';
import ModalConfirmRemovePost from './ModalConfirmRemovePost';

const cx = classNames.bind(styles);

const defaultPost = {
  title: '',
  description: '',
  url: '',
  status: 'TO LEARN',
};

const Posts = ({ handleShowModalAdd }) => {
  const [state, dispatch] = useContext(PostContext);
  const { posts } = state;
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [updatedPost, setUpdatedPost] = useState(defaultPost);
  const [deletedPostId, setDeletedPostId] = useState();

  // Update
  const handleCloseModalUpdate = () => {
    setUpdatedPost(defaultPost);
    setShowModalUpdate(false);
  };

  const handleShowModalUpdate = (post) => () => {
    setUpdatedPost(post);
    setShowModalUpdate(true);
  };

  const handleChangeUpdatedPost = (event) => {
    setUpdatedPost((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleUpdatePost = async (event, updatedPostId) => {
    event.preventDefault();
    dispatch(needLoading());
    setShowModalUpdate(false);
    try {
      const res = await postApi.update(updatedPostId, updatedPost);
      if (res.success) {
        toast.success(res.message);
        dispatch(update(res.post));
        setUpdatedPost(defaultPost);
      } else if (!res.data.success) {
        dispatch(getAll(posts));
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log('An unknown error:', error);
    }
  };

  // Delete
  const handleCloseModalDelete = () => {
    setDeletedPostId();
    setShowModalDelete(false);
  };

  const handleShowModalDelete = (id) => () => {
    setDeletedPostId(id);
    setShowModalDelete(true);
  };

  const handleDeletePost = async (event, deletedPostId) => {
    event.preventDefault();
    dispatch(needLoading());
    setShowModalDelete(false);
    try {
      const res = await postApi.delete(deletedPostId);
      if (res.success) {
        toast.success(res.message);
        dispatch(remove(res.post));
        setDeletedPostId();
      } else if (!res.data.success) {
        dispatch(getAll(posts));
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log('An unknown error:', error);
    }
  };

  return (
    <div className={cx('wrapper')}>
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          onShowModalUpdate={handleShowModalUpdate}
          onShowModalDelete={handleShowModalDelete}
        />
      ))}
      <img
        onClick={handleShowModalAdd}
        className={cx('create-icon')}
        src={createIcon}
        alt="Create icon"
      />
      <ModalUpdatePost
        showModalUpdate={showModalUpdate}
        onCloseModalUpdate={handleCloseModalUpdate}
        updatedPost={updatedPost}
        onUpdatePost={handleUpdatePost}
        onChangeUpdatedPost={handleChangeUpdatedPost}
      />
      <ModalConfirmRemovePost
        showModalDelete={showModalDelete}
        onCloseModalDelete={handleCloseModalDelete}
        onDeletePost={handleDeletePost}
        deletedPostId={deletedPostId}
      />
    </div>
  );
};

export default Posts;
