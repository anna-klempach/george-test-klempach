import { mainApi } from '../api/main.api';
import { MOCK_CURRENCY_DATA } from '../mocks/currency.mock';
import { mainService } from './main.service';

describe('mainService', () => {
  it('should get currency data', async () => {
    const apiGetSpy = jest.spyOn(mainApi, 'get');
    apiGetSpy.mockReturnValue(Promise.resolve({ data: MOCK_CURRENCY_DATA }));
    const result = await mainService.getCurrencies();
    expect(result).toEqual(MOCK_CURRENCY_DATA);
  });
  it('should return null if response has no currency data', async () => {
    const apiGetSpy = jest.spyOn(mainApi, 'get');
    apiGetSpy.mockReturnValue(Promise.resolve(undefined));
    const result = await mainService.getCurrencies();
    expect(result).toBeNull();
  });
});
