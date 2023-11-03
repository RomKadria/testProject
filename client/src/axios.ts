
import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api', // Replace with your Node.js backend URL
});

export default instance;
