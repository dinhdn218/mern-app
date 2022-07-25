import React from 'react';
import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import config from '@/config';

const cx = classNames.bind(styles);

const LoginForm = () => {
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
        <Button
          className={`mb-4 ${cx(`button`)}`}
          variant="success"
          type="submit"
        >
          Login
        </Button>
        <Form.Group className={cx('form-switch')}>
          <Form.Text>Don't have an account?</Form.Text>
          <Link to={config.routes.register}>
            <Button
              className={`mx-2 ${cx(`button`)}`}
              variant="info"
              type="button"
            >
              Register
            </Button>
          </Link>
        </Form.Group>
      </Form>
    </div>
  );
};

export default LoginForm;
