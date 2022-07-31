import authApi from '@/api/authApi';
import { LOCAL_STORAGE_TOKEN_NAME } from '@/constants/common';
import { setAuth } from '@/store/reducers/authActions';
import authReducer, { initState } from '@/store/reducers/authReducer';
import { useEffect, useReducer } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initState);

  const dataCommon = [state, dispatch];

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

  return <Context.Provider value={dataCommon}>{children}</Context.Provider>;
};

export default Provider;
