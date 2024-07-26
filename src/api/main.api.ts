import axios, { AxiosResponse } from 'axios';
import { notificationService } from '../services/notification.service';

export const BASE_URL =
  'https://run.mocky.io/v3/ac5ad8ce-2283-4f81-aa27-fb90ec5af0bc';

export const successCallback = function <T>(response: AxiosResponse<T, T>) {
  return response;
};

export const errorCallback = function (error: { message?: string }) {
  return notificationService.showNotification(
    'Error',
    error.message ?? '',
    'error'
  );
};

axios.interceptors.response.use(successCallback, errorCallback);

export const mainApi = {
  get: function <T = any, R = AxiosResponse<T>, D = any>(path: string = '') {
    return axios.get<T, R, D>(`${BASE_URL}/${path}`);
  },
};
