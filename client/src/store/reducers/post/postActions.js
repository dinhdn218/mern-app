import { GET_POSTS } from '@/constants/common';

const getAll = (payload) => ({
  type: GET_POSTS,
  payload,
});

export { getAll };
