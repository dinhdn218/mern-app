import { GET_POSTS } from '@/constants/common';

const initState = {
  postLoading: true,
  posts: [],
};

const postReducer = (state, action) => {
  const {
    type,
    payload: { posts },
  } = action;
  switch (type) {
    case GET_POSTS:
      return { ...state, postLoading: false, posts };

    default:
      return state;
  }
};

export { initState as initStatePosts };
export default postReducer;
