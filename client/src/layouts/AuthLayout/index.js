import React from "react";
import styles from "./AuthLayout.module.scss";

const AuthLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      AuthLayout
      {children}
    </div>
  );
};

export default AuthLayout;
