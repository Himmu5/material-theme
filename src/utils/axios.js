import axios from 'axios';
import authHeader from '../services/auth-header';

const API_URL = import.meta.env.VITE_REACT_BACKEND_BASE_URL;

const axiosInstance = axios.create({ baseURL: API_URL, headers: authHeader() });

export default axiosInstance;
