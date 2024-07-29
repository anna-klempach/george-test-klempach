import { screen, within } from '@testing-library/react';
import { renderWithUrl } from '../../utils/test.utils';
import { CurrencyItemProps } from './components/currency-item/currency-item.component';
import { CurrencyList } from './currency-list.component';
import {
  MOCK_BASE_CURRENCY,
  MOCK_CURRENCIES,
  MOCK_CURRENCY,
} from '../../mocks/currency.mock';
import { NO_DATA_FOUND_TEXT } from '../../services/currency-list.service';
const mockCurrencyItemTestId = 'mockCurrencyItem';
jest.mock('./components/currency-item/currency-item.component.tsx', () => ({
  CurrencyItem: ({
    currency,
    baseCurrency,
    exchangeRate,
  }: CurrencyItemProps) =>
    currency ? (
      <div data-testid={mockCurrencyItemTestId}>
        <p>{currency}</p>
        <p>{exchangeRate}</p>
        <p>{baseCurrency}</p>
      </div>
    ) : null,
}));

describe('CurrencyList', () => {
  it('should render list of currency items', async () => {
    renderWithUrl(
      <CurrencyList
        currencies={MOCK_CURRENCIES}
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );
    const currencyItemElements = await screen.findAllByTestId(
      mockCurrencyItemTestId
    );
    expect(currencyItemElements.length).toBe(MOCK_CURRENCIES.length);
  });
  it('should pass currency to each currency item', async () => {
    renderWithUrl(
      <CurrencyList
        currencies={MOCK_CURRENCIES}
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );
    const currencyItemElements = await screen.findAllByTestId(
      mockCurrencyItemTestId
    );
    currencyItemElements.forEach((item, i) => {
      expect(
        within(item).getByText(MOCK_CURRENCIES[i].currency)
      ).toBeInTheDocument();
    });
  });
  it('should pass base currency to each currency item', async () => {
    renderWithUrl(
      <CurrencyList
        currencies={MOCK_CURRENCIES}
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );
    const currencyItemElements = await screen.findAllByTestId(
      mockCurrencyItemTestId
    );
    currencyItemElements.forEach((item) => {
      expect(within(item).getByText(MOCK_BASE_CURRENCY)).toBeInTheDocument();
    });
  });
  it('should pass formatted exchange rate to each currency item', async () => {
    renderWithUrl(
      <CurrencyList
        currencies={MOCK_CURRENCIES}
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );
    const currencyItemElements = await screen.findAllByTestId(
      mockCurrencyItemTestId
    );
    currencyItemElements.forEach((item, i) => {
      const currencyItem = MOCK_CURRENCIES[i];
      const exchangeRate = currencyItem.exchangeRate?.middle.toFixed(
        currencyItem.precision
      );
      expect(within(item).getByText(exchangeRate!)).toBeInTheDocument();
    });
  });
  it('should pass item currency name if no currency is provided', async () => {
    const currenciesListWithoutName = [
      {
        ...MOCK_CURRENCY,
        currency: '',
      },
    ];
    renderWithUrl(
      <CurrencyList
        currencies={currenciesListWithoutName}
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );
    const currencyItemElement = await screen.findByTestId(
      mockCurrencyItemTestId
    );
    expect(
      within(currencyItemElement).getByText(MOCK_CURRENCY.nameI18N!)
    ).toBeInTheDocument();
  });
  it('should display "No data found" if no currencies have been passed', async () => {
    renderWithUrl(
      <CurrencyList currencies={[]} baseCurrency={MOCK_BASE_CURRENCY} />
    );
    expect(screen.getByText(NO_DATA_FOUND_TEXT)).toBeInTheDocument();
  });
  it('should not render currency item if there is no currency or currency name', async () => {
    const currenciesListWithoutName = [
      {
        ...MOCK_CURRENCY,
        currency: '',
        nameI18N: '',
      },
    ];
    renderWithUrl(
      <CurrencyList
        currencies={currenciesListWithoutName}
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );
    const currencyItemElement = screen.queryByTestId(mockCurrencyItemTestId);
    expect(currencyItemElement).toBeNull();
  });
});
