import config from "../config";
import About from "../pages/About";
import Home from "../pages/Home";
import Auth from "../pages/Auth";

const publicRoutes = [
  {
    path: config.routes.login,
    page: Auth,
  },
  {
    path: config.routes.register,
    page: Auth,
  },
];

const privateRoutes = [
  {
    path: config.routes.home,
    page: Home,
  },
  {
    path: config.routes.about,
    page: About,
  },
];

export { publicRoutes, privateRoutes };
