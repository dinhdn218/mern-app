import { AuthContext } from '@/store/contexts';
import classNames from 'classnames/bind';
import { useContext } from 'react';
import styles from './AuthLayout.module.scss';
import Spinner from 'react-bootstrap/Spinner';
import { Navigate } from 'react-router-dom';
import config from '@/config';

const cx = classNames.bind(styles);

const AuthLayout = ({ children }) => {
  // global state
  const [state] = useContext(AuthContext);
  const { authLoading, isAuthenticated } = state;

  return (
    <div className={cx('wrapper')}>
      <div className={cx('overlay')}>
        <div className={cx('inner')}>
          {authLoading ? (
            <Spinner
              className={cx('spinner')}
              animation="border"
              variant="info"
            />
          ) : isAuthenticated ? (
            <Navigate replace to={config.routes.dashboard} />
          ) : (
            <>
              <h1>LearnIt</h1>
              <h4>Keep track of what you are learning</h4>
              {children}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
