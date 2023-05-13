import axios from './axios';

const api = {
  users: {
    list: () => {
      const path = '/admin/all-students';
      return axios.get(path).then((res) => res.data);
    },
  },
  batch: {
    createBatch: (batchData) => {
      const path = 'admin/add-batch';
      return axios.post(path, batchData).then((res) => res.data);
    },
    list: (id) => {
      const path = `/admin/all-batches/?courseID=${id}`;
      return axios.get(path).then((res) => res.data);
    },
    getByBatch: (id) => {
      const path = `/admin/all-batches/${id}`;
      return axios.get(path).then((res) => res.data);
    },
  },
  voucher: {
    list: () => {
      const path = '/admin/all-vouchers';
      return axios.get(path).then((res) => res.data);
    },
  },
  course: {
    list: () => {
      const path = '/admin/all-courses';
      return axios.get(path).then((res) => res.data);
    },
    getById: (id) => {
      const path = `/admin/all-courses/${id}`;
      return axios.get(path).then((res) => res.data);
    },
  },
};

export default api;
