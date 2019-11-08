import axios from 'axios';

const API_URL = 'https://clapi.wisebirds.co';
const AUTH_API_URL = 'https://eas.wisebirds.co/v1.0';

// Default (일반용)
const instance = axios.create({
  baseURL: API_URL,
});
const HttpForDownload = axios.create({
  baseURL: API_URL,
  method: 'POST',
  responseType: 'blob',
});
// Login용
const HttpForLogin = axios.create({
  baseURL: AUTH_API_URL,
});

export default instance;
export { HttpForLogin, HttpForDownload };
