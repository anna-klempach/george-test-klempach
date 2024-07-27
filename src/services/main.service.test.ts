import { mainApi } from '../api/main.api';
import { MOCK_CURRENCY_DATA } from '../mocks/currency.mock';
import { mainService } from './main.service';

jest.useFakeTimers();
afterEach(() => {
  jest.runAllTimers();
});
describe('mainService', () => {
  it('should get currency data if no data has been preloaded', async () => {
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
  it('should not refetch currency data if the cache has not been invalidated yet', async () => {
    const apiGetSpy = jest.spyOn(mainApi, 'get');
    apiGetSpy.mockReturnValue(Promise.resolve({ data: MOCK_CURRENCY_DATA }));
    await mainService.getCurrencies();
    await mainService.getCurrencies();
    expect(apiGetSpy).toHaveBeenCalledTimes(1);
  });
  it('should return filtered currency data if search query has been passed', async () => {
    const apiGetSpy = jest.spyOn(mainApi, 'get');
    apiGetSpy.mockReturnValue(Promise.resolve({ data: MOCK_CURRENCY_DATA }));
    const filteredData = MOCK_CURRENCY_DATA.fx[0];
    const result = await mainService.getCurrencies(
      filteredData.currency.toLowerCase()
    );
    expect(result).toEqual({ ...MOCK_CURRENCY_DATA, fx: [filteredData] });
  });
});
