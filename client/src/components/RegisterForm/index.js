import React from 'react';
import styles from './RegisterForm.module.scss';
import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import config from '@/config';

const cx = classNames.bind(styles);

const RegisterForm = () => {
  return (
    <div className={cx('wrapper')}>
      <Form>
        <Form.Group className="mb-4">
          <Form.Control
            className={cx('input')}
            type="text"
            placeholder="Username"
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            className={cx('input')}
            type="password"
            placeholder="Password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Control
            className={cx('input')}
            type="password"
            placeholder="Confirm Password"
            required
          />
        </Form.Group>
        <Button
          className={`mb-4 ${cx(`button`)}`}
          variant="success"
          type="submit"
        >
          Register
        </Button>
        <Form.Group className={cx('form-switch')}>
          <Form.Text>Already have an account?</Form.Text>
          <Link className={cx('link')} to={config.routes.login}>
            <Button
              className={`mx-2 ${cx(`button`)}`}
              variant="info"
              type="button"
            >
              Login
            </Button>
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
};

export default RegisterForm;
