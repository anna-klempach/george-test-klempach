import axios from 'axios';
import { BASE_URL, errorCallback, mainApi, successCallback } from './main.api';
import { notificationService } from '../services/notification.service';

describe('mainApi', () => {
  it('should get data using base url and provided path', () => {
    const axiosSpy = jest.spyOn(axios, 'get');
    const path = 'test';
    mainApi.get(path);
    expect(axiosSpy).toHaveBeenCalledWith(`${BASE_URL}/${path}`);
  });
  it('should get data using base url if no path is provided', () => {
    const axiosSpy = jest.spyOn(axios, 'get');
    const path = '';
    mainApi.get(path);
    expect(axiosSpy).toHaveBeenCalledWith(`${BASE_URL}/`);
  });
  it('should show notification if the response has been an error', () => {
    const showNotificationSpy = jest.spyOn(
      notificationService,
      'showNotification'
    );
    const errorMessage = 'Error message';
    errorCallback({ message: errorMessage });
    expect(showNotificationSpy).toHaveBeenCalledWith(
      'Error',
      errorMessage,
      'error'
    );
  });
  it('should show notification with empty error message if the response has been an error and there is no error message in it', () => {
    const showNotificationSpy = jest.spyOn(
      notificationService,
      'showNotification'
    );
    errorCallback({ message: undefined });
    expect(showNotificationSpy).toHaveBeenCalledWith('Error', '', 'error');
  });
  it('should pass through the response if it has been a success', () => {
    const response = {
      data: 'Some test data',
    };
    expect(successCallback(response as any)).toEqual(response);
  });
});
