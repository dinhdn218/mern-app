import config from '@/config';
import { AuthContext } from '@/store/contexts';
import React, { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Navigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProtectedRoute.module.scss';

const cx = classNames.bind(styles);

const ProtectedRoute = ({ children }) => {
  const [authState] = useContext(AuthContext);
  const { authLoading, isAuthenticated } = authState;

  return authLoading ? (
    <div className={cx('wrapper-spinner')}>
      <Spinner className={cx('spinner')} animation="border" variant="info" />
    </div>
  ) : isAuthenticated ? (
    children
  ) : (
    <Navigate replace to={config.routes.login} />
  );
};

export default ProtectedRoute;
