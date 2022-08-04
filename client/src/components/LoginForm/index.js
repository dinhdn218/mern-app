import authApi from '@/api/authApi';
import config from '@/config';
import { AuthContext } from '@/store/contexts';
import { setAuth } from '@/store/reducers/authActions';
import classNames from 'classnames/bind';
import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './LoginForm.module.scss';

const cx = classNames.bind(styles);

const LoginForm = () => {
  // global state
  const [, dispatch] = useContext(AuthContext);

  // local state
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

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
        dispatch(
          setAuth({
            isAuthenticated: true,
            user: loginData.user,
          }),
        );
        toast.success('Welcome!!!');
      } else {
        toast.error(loginData.data.message);
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
