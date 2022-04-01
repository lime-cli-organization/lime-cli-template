import axios from 'axios';
import { obj2params } from '@/utils/utils';

const instance = axios.create({
  baseURL: 'http://114.55.115.86:8001',
});

export const GetImage = () => {
  return instance({
    url: '/api/Authorize/GetImage',
    method: 'get',
  });
};

export const LoginWithCode = (data) => {
  return instance({
    url: '/api/Authorize/LoginWithCode?' + obj2params(data),
    method: 'post',
    data,
  });
};
