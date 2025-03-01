import axios from "axios";
import axiosInstance from "./axios";
import { S3_BUCKET_URL } from "./config";
import FileDownload from "js-file-download";
import { BACKEND_BASE_URL } from "./config";

const api = {
  users: {
    list: (page = 0, all = false) => {
      const path = `/admin/all-students?page=${page}${all ? "&all=true" : ""}`;
      return axiosInstance.get(path).then((res) => res.data);
    },
    glance: () => {
      const path = "/admin/students-glance";
      return axiosInstance.get(path).then((res) => res.data);
    },
  },
  batch: {
    createBatch: (batchData) => {
      const path = "/admin/add-batch";
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
    update: (batchData, id) => {
      const path = `/admin/edit-batch/${id}`;
      return axiosInstance.put(path, batchData).then((res) => res.data);
    },
  },
  voucher: {
    add: (voucher) => {
      const path = "/admin/add-voucher";
      return axiosInstance.post(path, voucher).then((res) => res.data);
    },
    list: () => {
      const path = "/admin/all-vouchers";
      return axiosInstance.get(path).then((res) => res.data);
    },
    deleteList: (vouchers, id) => {
      const path = `/admin/remove-voucher/${id}`;
      return axiosInstance.post(path, vouchers).then((res) => res.data);
    },
  },
  course: {
    list: () => {
      const path = "/admin/all-courses";
      return axiosInstance.get(path).then((res) => res.data);
    },
    getById: (id) => {
      const path = `/admin/single-course/${id}`;
      return axiosInstance.get(path).then((res) => res.data);
    },
  },
  schedules: {
    slots: (id) => {
      const path = "/admin/available-slots";
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
      const path = "/admin/mark-attendance";
      return axiosInstance.post(path, attendance).then((res) => res.data);
    },
  },
  certificate: {
    s3url: (files) => {
      const path = "/s3url";
      return axiosInstance.post(path, files).then((res) => res.data);
    },
    upload: (url, files) =>
      axios
        .put(url, files, { "Content-Type": "multipart/form-data" })
        .then((res) => res),
    save: (courseId, studentId, s3url) => {
      const path = `/admin/add-certificate/${courseId}/${studentId}`;
      const urlWithoutParams = String(s3url).split("?")[0];
      const fileName = String(urlWithoutParams).split("/").pop();
      return axiosInstance
        .post(path, { certificate: `http://${S3_BUCKET_URL}/${fileName}` })
        .then((res) => res.data);
    },
  },
  notification: {
    list_new: () => {
      const path = "/admin/notification/1";
      return axiosInstance.get(path).then((res) => res.data);
    },
  },
};

export function createEvents(formData) {
  const path = "/internship/";
  return axiosInstance
    .post(path, formData)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { success: false, err };
    });
}

export function getEvents(pageName) {
  let page = 1;
  let limit = 10;
  const path = "/" + pageName + `?page=${page}&limit=${limit}`;
  return axiosInstance
    .get(path)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { success: false, err };
    });
}

export function deleteEvent(eventType, eventId) {
  const path = `/${eventType}/${eventType}/` + eventId;
  return axiosInstance
    .delete(path)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { success: false, err };
    });
}

export function getEventById(everyType, id) {
  const path = `/${everyType}/${everyType}/` + id;
  return axiosInstance
    .get(path)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return { success: false, err };
    });
}

export function updateEvent(data, id) {
  const path = "/webinar/webinar/" + id;
  return axiosInstance
    .put(path, data)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return { success: false, err };
    });
}

export function exportEvent(eventType, id) {
  const token = JSON.parse(localStorage.getItem("admin"));

  return axios
    .get(BACKEND_BASE_URL + `/${eventType}/${eventType}/export/` + id, {
      responseType: "blob",
      headers: { Authorization: "Bearer "+ token.token },
    })
    .then((res) => {
      FileDownload(res.data, `${eventType}.xlsx`);
    });

}

export default api;
