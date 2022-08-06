import Logo from '@/assets/logo.svg';
import LogoutIcon from '@/assets/logout.svg';
import config from '@/config';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames/bind';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavbarBootstrap from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';
import { useContext } from 'react';
import { AuthContext } from '@/store/contexts';
import { LOCAL_STORAGE_TOKEN_NAME } from '@/constants/common';
import { setAuth } from '@/store/reducers/authActions';

const cx = classNames.bind(styles);

const Navbar = () => {
  const [state, dispatch] = useContext(AuthContext);
  const {
    user: { username },
  } = state;

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
    dispatch(setAuth({ isAuthenticated: false, user: null }));
  };

  return (
    <NavbarBootstrap
      className={cx('wrapper')}
      collapseOnSelect
      expand="lg"
      bg="info"
      variant="dark"
    >
      <Container fluid className={`mx-3 ${cx('container')}`}>
        <NavbarBootstrap.Brand
          className={`d-flex align-items-center ${cx('brand')}`}
          as={NavLink}
          to={config.routes.home}
        >
          <img src={Logo} alt="Logo" />
          <div className={cx('brand-text')}>LearnIt</div>
        </NavbarBootstrap.Brand>
        <NavbarBootstrap.Toggle aria-controls="responsive-navbar-nav" />
        <NavbarBootstrap.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to={config.routes.home}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to={config.routes.about}>
              About
            </Nav.Link>
          </Nav>
          <Nav>
            <div className={`text-white ${cx('welcome')}`}>
              Welcome, {username}
            </div>
            <Button
              className={`d-flex align-items-center ${cx('button-logout')}`}
              variant="secondary"
              onClick={handleLogout}
            >
              <img src={LogoutIcon} alt="logout icon" />
              <div>Logout</div>
            </Button>
          </Nav>
        </NavbarBootstrap.Collapse>
      </Container>
    </NavbarBootstrap>
  );
};

export default Navbar;
