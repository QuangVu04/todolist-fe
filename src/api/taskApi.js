import axiosClient from './axiosClient';

const taskApi = {
  getAll() {
    return axiosClient.get('/api/alltasks');
  },
  
  create(data) {
    return axiosClient.post('/api/create', data);
  },
  
  update(id, data) {
    return axiosClient.post(`/api/update?id=${id}`, data);
  },
  
  delete(id) {
    return axiosClient.delete(`/api/delete?id=${id}`);
  },

  search(title) {
    return axiosClient.get(`/api/search?title=${title}`);
  }
};

export default taskApi;