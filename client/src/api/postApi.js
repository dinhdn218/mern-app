import axiosClient from './axiosClient';

class PostApi {
  getAll = async () => {
    try {
      const response = await axiosClient.get('/posts');
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

const postApi = new PostApi();
export default postApi;
