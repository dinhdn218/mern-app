import { GET_POSTS, NEED_LOADING } from '@/constants/common';

const getAll = (payload) => ({
  type: GET_POSTS,
  payload,
});

const needLoading = () => ({
  type: NEED_LOADING,
  payload: { posts: [] },
});

export { getAll, needLoading };
