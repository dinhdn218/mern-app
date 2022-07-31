import { SET_AUTH } from '@/constants/common';

const setAuth = (payload) => ({
  type: SET_AUTH,
  payload,
});

export { setAuth };
