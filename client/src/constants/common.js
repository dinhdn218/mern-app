const API_URL =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:5000/api'
    : 'something after deploy';

const LOCAL_STORAGE_TOKEN_NAME = 'learnit-mern';

const SET_AUTH = 'SET_AUTH';

export { API_URL, LOCAL_STORAGE_TOKEN_NAME, SET_AUTH };
