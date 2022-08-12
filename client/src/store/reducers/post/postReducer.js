import {
  CREATE_POST,
  DELETE_POST,
  GET_POSTS,
  NEED_LOADING,
  UPDATE_POST,
} from '@/constants/common';

const initState = {
  postLoading: true,
  posts: [],
};

const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case NEED_LOADING:
      return { ...state, postLoading: true };

    case GET_POSTS:
      return { ...state, postLoading: false, posts: payload };

    case CREATE_POST:
      return {
        ...state,
        postLoading: false,
        posts: [...state.posts, payload],
      };

    case UPDATE_POST:
      const newPosts = state.posts.map((post) =>
        post._id === payload._id ? payload : post,
      );

      return {
        ...state,
        postLoading: false,
        posts: newPosts,
      };

    case DELETE_POST:
      return {
        ...state,
        postLoading: false,
        posts: state.posts.filter((post) => post._id !== payload._id),
      };

    default:
      return state;
  }
};

export { initState as initStatePosts };
export default postReducer;
