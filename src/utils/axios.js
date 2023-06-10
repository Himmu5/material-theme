import axios from 'axios';
import authHeader from '../services/auth-header';
import { BACKEND_BASE_URL } from './config';

const axiosInstance = axios.create({ baseURL: BACKEND_BASE_URL, headers: authHeader() });

export default axiosInstance;
