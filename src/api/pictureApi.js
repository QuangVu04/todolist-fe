import axiosClient from './axiosClient';

const pictureApi = {
  uploadPicture(file) {
    return axiosClient.post('/pictures/upload', file, {
      headers: {
        'Content-Type': undefined
      }
    });
  },

  deletePicture(fileUrl) {
    return axiosClient.post(`/pictures/delete`, fileUrl);
  }
};

export default pictureApi;