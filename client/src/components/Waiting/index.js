import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import classNames from 'classnames/bind';
import styles from './Waiting.module.scss';

const cx = classNames.bind(styles);

const Waiting = ({ waiting }) => {
  return (
    <div className={cx('wrapper', waiting && 'show')}>
      <div className={cx('inner')}>
        <Spinner className="mx-2" animation="grow" variant="success" />
        <Spinner className="mx-2" animation="grow" variant="success" />
        <Spinner className="mx-2" animation="grow" variant="success" />
      </div>
    </div>
  );
};

export default Waiting;
