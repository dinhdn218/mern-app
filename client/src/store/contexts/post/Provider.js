import postReducer, { initStatePosts } from '@/store/reducers/post/postReducer';
import { useReducer } from 'react';
import Context from './Context';

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(postReducer, initStatePosts);

  const data = [state, dispatch];

  return <Context.Provider value={data}>{children}</Context.Provider>;
};

export default Provider;
