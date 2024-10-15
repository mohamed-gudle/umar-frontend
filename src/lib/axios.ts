import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export default axiosInstance;