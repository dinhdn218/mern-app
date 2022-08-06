import LoginForm from '@/layouts/AuthLayout/components/LoginForm';
import RegisterForm from '@/layouts/AuthLayout/components/RegisterForm';
import config from '@/config';
import About from '@/pages/About';
import Home from '@/pages/Home';

const publicRoutes = [
  {
    path: config.routes.login,
    component: LoginForm,
  },
  {
    path: config.routes.register,
    component: RegisterForm,
  },
];

const privateRoutes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.about,
    component: About,
  },
];

export { publicRoutes, privateRoutes };
