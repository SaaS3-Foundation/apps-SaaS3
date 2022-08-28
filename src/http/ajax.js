import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://rpc.saas3.io:3000'
})

export default axios;