import {
  GET_POSTS,
  NEED_LOADING,
  CREATE_POST,
  UPDATE_POST,
  DELETE_POST,
} from '@/constants/common';

const getAll = (payload) => ({
  type: GET_POSTS,
  payload,
});

const needLoading = () => ({
  type: NEED_LOADING,
});

const create = (payload) => ({
  type: CREATE_POST,
  payload,
});

const update = (payload) => ({
  type: UPDATE_POST,
  payload,
});

const remove = (payload) => ({
  type: DELETE_POST,
  payload,
});

export { getAll, needLoading, create, update, remove };
