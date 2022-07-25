import React from 'react';
import styles from './AuthLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const AuthLayout = ({ children }) => {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('overlay')}>
        <div className={cx('inner')}>
          <h1>LearnIt</h1>
          <h4>Keep track of what you are learning</h4>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
