import axios from 'axios';

const getSensorData = async () => {
  return axios.get('http://192.168.0.200:8080/api/dht/get-sensor-data', {
    withCredentials: true,
  })
  .then(response => {
    return Promise.resolve(response.data);
  }).catch(error => {
    console.error(error);
    return Promise.reject(error);
  });
};

export {
  getSensorData,
};