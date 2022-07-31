import LoginForm from '@/components/LoginForm';
import RegisterForm from '@/components/RegisterForm';
import config from '@/config';
import About from '@/pages/About';
import Dashboard from '@/pages/Dashboard';
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
  {
    path: config.routes.dashboard,
    component: Dashboard,
  },
];

export { publicRoutes, privateRoutes };

