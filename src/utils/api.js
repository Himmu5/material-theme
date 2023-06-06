import axios from './axios';

const api = {
  users: {
    list: () => {
      const path = '/admin/all-students';
      return axios.get(path).then((res) => res.data);
    },
    glance: () => {
      const path = '/admin/students-glance';
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
    getById: (id) => {
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
    deleteList: (vouchers, id) => {
      const path = `/admin/remove-voucher/${id}`;
      return axios.post(path, vouchers).then((res) => res.data);
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
    slots: (id) => {
      const path = '/admin/available-slots';
      return axios.post(path, { batchId: id }).then((res) => res.data);
    },
    bookings: (id, date) => {
      const path = `/admin/students-scheduled/?id=${id}&date=${date}`;
      return axios.get(path).then((res) => res.data);
    },
    update: (slots, batchId) => {
      const path = `/admin/add-slots/${batchId}`;
      return axios.post(path, slots).then((res) => res.data);
    },
    markAttendance: (attendance) => {
      const path = '/admin/mark-attendance';
      return axios.post(path, attendance).then((res) => res.data);
    },
  },
  certificate: {
    s3url: (files) => {
      const path = '/s3url';
      return axios.post(path, files).then((res) => res.data);
    },
    upload: (courseId, studentId, certificate) => {
      const path = `/admin/add-certificate/${courseId}/${studentId}`;
      return axios.post(path, certificate).then((res) => res.data);
    },
  },
};

export default api;
