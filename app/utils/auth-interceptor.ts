import axios from 'axios';
import { API } from './types-and-links';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({
  baseURL: API,
});

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