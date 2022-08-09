import createIcon from '@/assets/plus-circle-fill.svg';
import classNames from 'classnames/bind';
import ModalAddPost from './ModalAddPost';
import Post from './Post';
import styles from './Posts.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Posts = ({ posts }) => {
  const [showModalAdd, setShowModalAdd] = useState(true);

  const handleCloseModalAdd = () => setShowModalAdd(false);
  const handleShowModalAdd = () => setShowModalAdd(true);
  const handleSubmitModalAdd = (event) => {
    event.preventDefault();
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
        onCloseModalAdd={handleCloseModalAdd}
        onSubmit={handleSubmitModalAdd}
      />
    </div>
  );
};

export default Posts;
