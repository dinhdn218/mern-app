import postApi from '@/api/postApi';
import { getAll } from '@/store/reducers/post/postActions';
import postReducer, { initStatePosts } from '@/store/reducers/post/postReducer';
import { useEffect, useReducer } from 'react';
import { toast } from 'react-toastify';
import Context from './Context';

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initStatePosts);

  const data = [state, dispatch];

  const getPosts = async () => {
    try {
      const response = await postApi.getAll();
      if (response.success) {
        dispatch(getAll(response.posts));
      } else if (!response.data.success) {
        dispatch(getAll([]));
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(getAll([]));
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default Provider;
