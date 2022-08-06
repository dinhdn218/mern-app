import React from 'react';
import Navbar from './components/Navbar';
import styles from './MainLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const MainLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Navbar />
      <div className={cx('content')}>{children}</div>
    </div>
  );
};

export default MainLayout;
