import axios from 'axios';

const API_URL = import.meta.env.VITE_REACT_BACKEND_BASE_URL;

const adminRegister = (email, password) => axios
  .post(`${API_URL}signup`, {
    email,
    password,
  })
  .then((response) => {
    if (response.data.data.token) {
      localStorage.setItem('admin', JSON.stringify({ token: response.data.data.token }));
    }

    return response.data;
  });

const adminLogin = (email, password) => axios
  .post(`${API_URL}auth/admin-login`, {
    email,
    password,
  })
  .then((response) => {
    console.log(response);
    if (response.data.data.token) {
      localStorage.setItem('admin', JSON.stringify({ token: response.data.data.token }));
    }

    return response.data;
  });

const adminLogout = () => {
  localStorage.removeItem('admin');
};

const register = (formData) => axios.post(`${API_URL}auth/signup/ca`, formData).then((response) => {
  if (response.data.data.token) {
    localStorage.setItem('user', JSON.stringify({ token: response.data.data.token }));
  }

  return response.data;
});

const login = (email, password) => axios
  .post(`${API_URL}auth/login/ca`, {
    email,
    password,
  })
  .then((response) => {
    if (response.data.data.token) {
      localStorage.setItem('user', JSON.stringify({ token: response.data.data.token }));
    }

    return response.data;
  });

const logout = () => {
  localStorage.removeItem('user');
};

const authService = {
  login,
  register,
  logout,
  adminLogin,
  adminLogout,
  adminRegister,
};

export default authService;
