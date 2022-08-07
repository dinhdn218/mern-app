import createIcon from '@/assets/plus-circle-fill.svg';
import classNames from 'classnames/bind';
import Post from '../Post';
import styles from './Posts.module.scss';

const cx = classNames.bind(styles);

const Posts = ({ posts }) => {
  return (
    <div className={cx('wrapper')}>
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
      <img className={cx('create-icon')} src={createIcon} alt="Create icon" />
    </div>
  );
};

export default Posts;
