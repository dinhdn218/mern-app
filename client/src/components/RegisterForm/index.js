import config from '@/config';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import styles from './RegisterForm.module.scss';
import { toast } from 'react-toastify';
import authApi from '@/api/authApi';

const cx = classNames.bind(styles);

const RegisterForm = () => {
  const navigate = useNavigate();
  // local state
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { username, password, confirmPassword } = registerForm;

  const handleChange = (event) => {
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.warn('Password and confirm password do not match');
      return;
    }
    // Delete key confirmPassword not necessary
    const payload = { ...registerForm };
    delete payload.confirmPassword;
    try {
      const registerData = await authApi.register(payload);
      console.log(registerData);
      if (registerData.success) {
        toast.success(registerData.message);
        navigate(config.routes.login);
      } else {
        toast.error(registerData.data.message);
      }
    } catch (error) {
      console.log('An unknown error:', error);
    }
  };

  // console.log(registerForm);

  return (
    <div className={cx('wrapper')}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-4">
          <Form.Control
            className={cx('input')}
            type="text"
            placeholder="Username"
            required
            name="username"
            value={username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Control
            className={cx('input')}
            type="password"
            placeholder="Password"
            required
            name="password"
            value={password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Control
            className={cx('input')}
            type="password"
            placeholder="Confirm Password"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
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
