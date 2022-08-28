import axios from '../http/ajax';

export function getStatus(params) {
  return axios.get('/saas3/dapi/status', { params });
}
