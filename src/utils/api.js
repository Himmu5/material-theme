import axios from 'axios';
import axiosInstance from './axios';
import { S3_BUCKET_URL } from './config';

const api = {
  users: {
    list: (page) => {
      const path = `/admin/all-students?page=${page}`;
      return axiosInstance.get(path).then((res) => res.data);
    },
    glance: () => {
      const path = '/admin/students-glance';
      return axiosInstance.get(path).then((res) => res.data);
    },
  },
  batch: {
    createBatch: (batchData) => {
      const path = '/admin/add-batch';
      return axiosInstance.post(path, batchData).then((res) => res.data);
    },
    list: (id) => {
      const path = `/admin/all-batches/?courseID=${id}`;
      return axiosInstance.get(path).then((res) => res.data);
    },
    getById: (id) => {
      const path = `/admin/all-batches/${id}`;
      return axiosInstance.get(path).then((res) => res.data);
    },
  },
  voucher: {
    add: (voucher) => {
      const path = '/admin/add-voucher';
      return axiosInstance.post(path, voucher).then((res) => res.data);
    },
    list: () => {
      const path = '/admin/all-vouchers';
      return axiosInstance.get(path).then((res) => res.data);
    },
    deleteList: (vouchers, id) => {
      const path = `/admin/remove-voucher/${id}`;
      return axiosInstance.post(path, vouchers).then((res) => res.data);
    },
  },
  course: {
    list: () => {
      const path = '/admin/all-courses';
      return axiosInstance.get(path).then((res) => res.data);
    },
    getById: (id) => {
      const path = `/admin/single-course/${id}`;
      return axiosInstance.get(path).then((res) => res.data);
    },
  },
  schedules: {
    slots: (id) => {
      const path = '/admin/available-slots';
      return axiosInstance.post(path, { batchId: id }).then((res) => res.data);
    },
    chapters: (id) => {
      const path = `/admin/site-visit-lessons/${id}`;
      return axiosInstance.get(path).then((res) => res.data);
    },
    bookings: (id, date) => {
      const path = `/admin/students-scheduled/?id=${id}&date=${date}`;
      return axiosInstance.get(path).then((res) => res.data);
    },
    update: (slots, batchId) => {
      const path = `/admin/add-slots/${batchId}`;
      return axiosInstance.post(path, slots).then((res) => res.data);
    },
    markAttendance: (attendance) => {
      const path = '/admin/mark-attendance';
      return axiosInstance.post(path, attendance).then((res) => res.data);
    },
  },
  certificate: {
    s3url: (files) => {
      const path = '/s3url';
      return axiosInstance.post(path, files).then((res) => res.data);
    },
    upload: (url, files) => axios.put(url, files, { 'Content-Type': 'multipart/form-data' }).then((res) => res),
    save: (courseId, studentId, s3url) => {
      const path = `/admin/add-certificate/${courseId}/${studentId}`;
      const urlWithoutParams = String(s3url).split('?')[0];
      const fileName = String(urlWithoutParams).split('/').pop();
      return axiosInstance
        .post(path, { certificate: `http://${S3_BUCKET_URL}/${fileName}` })
        .then((res) => res.data);
    },
  },
  notification: {
    list_new: () => {
      const path = '/admin/notification/1';
      return axiosInstance.get(path).then((res) => res.data);
    },
  },
};

export default api;
