import config from '@/config';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const isAccess = false;

  return (
    <>
      {isAccess ? (
        <div>Home</div>
      ) : (
        <Navigate replace to={config.routes.login} />
      )}
    </>
  );
};

export default Home;
