import  axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => response.data, 
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;