import axios from 'axios';
import { API } from './types-and-links';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getCookie } from 'cookies-next';

const axiosInstance = axios.create({
  baseURL: API,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const sessionToken = getCookie('session_id'); // Get session token from cookies
    if (sessionToken) {
      config.headers['Authorization'] = `Bearer ${sessionToken}`; // Add session token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle 401 responses
axiosInstance.interceptors.response.use(
  (response) => response, // Allow successful responses
  (error) => {
    const router = useRouter();
    if (error.response?.status === 401) {
      toast.error('Session expired. Please log in again.');
      router.push('/login'); // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;