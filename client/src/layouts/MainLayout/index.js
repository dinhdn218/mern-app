import React from 'react';
import styles from './MainLayout.module.scss';

const MainLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      Main Layout
      {children}
    </div>
  );
};

export default MainLayout;
