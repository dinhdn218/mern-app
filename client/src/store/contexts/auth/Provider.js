import authApi from '@/api/authApi';
import { LOCAL_STORAGE_TOKEN_NAME } from '@/constants/common';
import { setAuth } from '@/store/reducers/auth/authActions';
import authReducer, { initStateAuth } from '@/store/reducers/auth/authReducer';
import { useEffect, useReducer } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initStateAuth);

  const data = [state, dispatch];

  const loadingUser = async () => {
    try {
      const response = await authApi.check();
      if (response.success) {
        dispatch(
          setAuth({
            isAuthenticated: true,
            user: response.user,
          }),
        );
      } else if (!response.data.success) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
        dispatch(
          setAuth({
            isAuthenticated: false,
            user: null,
          }),
        );
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
      dispatch(
        setAuth({
          isAuthenticated: false,
          user: null,
        }),
      );
    }
  };

  useEffect(() => {
    loadingUser();
  }, []);

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default Provider;
