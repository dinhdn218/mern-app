import Waiting from '@/components/Waiting';
import config from '@/config';
import { AuthContext } from '@/store/contexts';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Navigate } from 'react-router-dom';
import styles from './AuthLayout.module.scss';

const cx = classNames.bind(styles);

const AuthLayout = ({ children, waiting }) => {
  // global state
  const [authState] = useContext(AuthContext);
  const { authLoading, isAuthenticated } = authState;

  return authLoading ? (
    <div className={cx('wrapper-spinner')}>
      <Spinner className={cx('spinner')} animation="border" variant="info" />
    </div>
  ) : isAuthenticated ? (
    <Navigate replace to={config.routes.home} />
  ) : (
    <div className={cx('wrapper')}>
      <div className={cx('overlay')}>
        <div className={cx('inner')}>
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          {children}
        </div>
      </div>
      <Waiting waiting={waiting} />
    </div>
  );
};

export default AuthLayout;
