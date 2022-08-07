import { SET_AUTH } from '@/constants/common';

const initState = {
  authLoading: true,
  isAuthenticated: false,
  user: null,
};

const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;
  switch (type) {
    case SET_AUTH:
      return { ...state, authLoading: false, isAuthenticated, user };

    default:
      return state;
  }
};

export { initState as initStateAuth };
export default authReducer;
