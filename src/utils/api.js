import axios from './axios';

const api = {
  users: {
    list: () => {
      const path = '/admin/all-students';
      return axios.get(path).then((res) => res.data);
    },
  },
};

export default api;
