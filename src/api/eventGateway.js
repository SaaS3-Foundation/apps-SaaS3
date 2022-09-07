import axios from '../http/ajax';

export function getStatus(params) {
  return axios.get('/saas3/dapi/status', { params });
}

export function submit(params, data) {
  return axios.post('/saas3/dapi/submit', data, {
    params
  });
}
