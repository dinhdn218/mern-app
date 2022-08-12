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

  create = async (post) => {
    try {
      const response = await axiosClient.post('/posts', post);
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

  update = async (id, newPost) => {
    try {
      const response = await axiosClient.put(`/posts/${id}`, newPost);
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

  delete = async (id) => {
    try {
      const response = await axiosClient.delete(`/posts/${id}`);
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
