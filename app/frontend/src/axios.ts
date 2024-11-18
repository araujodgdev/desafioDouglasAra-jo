import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API's base URL
});

export default instance;
