const API_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000/api'
    : 'something after deploy';

const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern';

const SET_AUTH = 'SET_AUTH';

const GET_POSTS = 'GET_POSTS';

const NEED_LOADING = 'NEED_LOADING';

const POST_STATUS = {
  TO_LEARN: 'TO LEARN',
  LEARNING: 'LEARNING',
  LEARNED: 'LEARNED',
};

export {
  API_URL,
  LOCAL_STORAGE_TOKEN_NAME,
  SET_AUTH,
  GET_POSTS,
  POST_STATUS,
  NEED_LOADING,
};
