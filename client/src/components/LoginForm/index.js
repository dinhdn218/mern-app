import authApi from '@/api/authApi';
import config from '@/config';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.scss';

const cx = classNames.bind(styles);

const LoginForm = () => {
  // local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const { username, password } = loginForm;

  const handleChange = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginData = await authApi.login(loginForm);
      if (loginData.success) {
        navigate(config.routes.dashboard);
      } else {
        // Login fail
      }
    } catch (error) {
      console.log('An unknown error:', error);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Control
            className={cx('input')}
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={handleChange}
            name="username"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            className={cx('input')}
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={handleChange}
            name="password"
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
