/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, screen, within } from '@testing-library/react';
import { Main } from './main.component';
import { renderWithUrl } from '../../utils/test.utils';
import { mainService } from '../../services/main.service';
import { CurrencyListProps } from '../../components/currency-list/currency-list.component';
import { MOCK_BASE_CURRENCY, MOCK_CURRENCIES } from '../../mocks/currency.mock';

const mockSetSearchParams = jest.fn();
const mockCurrencyListTestId = 'mockCurrencyList';
const mockCurrencyTestId = 'mockCurrency';
const mockBaseCurrencyTestId = 'mockBaseCurrency';
const mockEmptyCurrenciesText = 'Currencies length is 0';
const mockEmptyBaseCurrencyText = 'Base currency is empty';
jest.mock('react-router-dom', () => {
  const actualModule = jest.requireActual('react-router-dom');
  return {
    ...actualModule,
    useSearchParams: () => [{}, mockSetSearchParams],
  };
});

afterEach(() => {
  jest.resetAllMocks();
});

jest.mock('../../components/currency-list/currency-list.component.tsx', () => ({
  CurrencyList: ({ currencies, baseCurrency }: CurrencyListProps) => (
    <div data-testid={mockCurrencyListTestId}>
      {currencies.length > 0 ? (
        currencies.map((item) => (
          <div data-testid={mockCurrencyTestId} key={item.currency}>
            {item.currency}
          </div>
        ))
      ) : (
        <p>{mockEmptyCurrenciesText}</p>
      )}
      {baseCurrency ? (
        <div data-testid={mockBaseCurrencyTestId}>{baseCurrency}</div>
      ) : (
        <p>{mockEmptyBaseCurrencyText}</p>
      )}
    </div>
  ),
}));

jest.mock('../../services/main.service.ts', () => ({
  mainService: {
    getCurrencies: () =>
      Promise.resolve({
        baseCurrency: MOCK_BASE_CURRENCY,
        fx: MOCK_CURRENCIES,
      }),
  },
}));

describe('Main Page', () => {
  it('should render Search bar', async () => {
    await act(async () => renderWithUrl(<Main />));
    expect(await screen.findByText(/search/i)).toBeInTheDocument();
  });
  it('should set search text into url as search parameter', async () => {
    await act(async () => renderWithUrl(<Main />));
    const inputElement = await screen.findByLabelText(/search/i);
    const testValue = 'Test';
    fireEvent.change(inputElement, { target: { value: testValue } });
    expect(mockSetSearchParams).toHaveBeenLastCalledWith({ search: testValue });
  });

  it('should render currency list', async () => {
    await act(async () => renderWithUrl(<Main />));
    expect(
      await screen.findByTestId(mockCurrencyListTestId)
    ).toBeInTheDocument();
  });
  it('should pass currencies to currency list', async () => {
    await act(async () => renderWithUrl(<Main />));
    const currrencies = await screen.findAllByTestId(mockCurrencyTestId);
    expect(currrencies.length).toBe(MOCK_CURRENCIES.length);
    currrencies.forEach((item, i) =>
      expect(
        within(item).getByText(MOCK_CURRENCIES[i].currency)
      ).toBeInTheDocument()
    );
  });
  it('should pass base currency currency list', async () => {
    await act(async () => renderWithUrl(<Main />));
    const baseCurrency = await screen.findByTestId(mockBaseCurrencyTestId);
    expect(
      within(baseCurrency).getByText(MOCK_BASE_CURRENCY)
    ).toBeInTheDocument();
  });

  it('should get currencies on render', async () => {
    const getCurrenciesSpy = jest.spyOn(mainService, 'getCurrencies');
    await act(async () => renderWithUrl(<Main />));
    expect(getCurrenciesSpy).toHaveBeenCalled();
  });
  it('should set empty currencies array if currencies is null', async () => {
    const getCurrenciesSpy = jest.spyOn(mainService, 'getCurrencies');
    getCurrenciesSpy.mockReturnValue(Promise.resolve(null));
    await act(async () => renderWithUrl(<Main />));
    expect(
      await screen.findByText(mockEmptyCurrenciesText)
    ).toBeInTheDocument();
  });
  it('should set empty base currency if base currency is undefined', async () => {
    const getCurrenciesSpy = jest.spyOn(mainService, 'getCurrencies');
    getCurrenciesSpy.mockReturnValue(Promise.resolve(null));
    await act(async () => renderWithUrl(<Main />));
    expect(
      await screen.findByText(mockEmptyBaseCurrencyText)
    ).toBeInTheDocument();
  });
});
