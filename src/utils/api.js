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
      const path = '/admin/add-batch';
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
    add: (voucher) => {
      const path = '/admin/add-voucher';
      return axios.post(path, voucher).then((res) => res.data);
    },
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
      const path = `/admin/single-course/${id}`;
      return axios.get(path).then((res) => res.data);
    },
  },
  schedules: {
    students: (id) => {
      const today = new Date();
      const dateString = `${today.getFullYear()}-${`0${today.getMonth() + 1}`.slice(
        -2,
      )}-${`0${today.getDate()}`.slice(-2)}`;
      console.log(dateString);
      const path = `/admin/students-scheduled/?id=${id}&date=${dateString}`;

      return axios.get(path).then((res) => res.data);
    },
  },
};

export default api;
