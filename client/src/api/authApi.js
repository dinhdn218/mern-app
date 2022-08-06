import { LOCAL_STORAGE_TOKEN_NAME } from '@/constants/common';
import axiosClient from './axiosClient';

class AuthApi {
  login = async (loginForm) => {
    try {
      const response = await axiosClient.post('auth/login', loginForm);
      if (response.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.accessToken);
      }
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  };

  register = async (registerForm) => {
    try {
      const response = await axiosClient.post('auth/register', registerForm);
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  };

  check = async () => {
    try {
      const response = await axiosClient.get('/auth');
      return response;
    } catch (error) {
      if (error.response) {
        return error.response;
      } else {
        return {
          success: false,
          message: error.message,
        };
      }
    }
  };
}

const authApi = new AuthApi();
export default authApi;
