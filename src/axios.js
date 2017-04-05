import axios from 'axios';

const instance = axios.create({baseURL: 'http://138.197.65.89:9000',});
export default instance;

