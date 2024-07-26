import { screen, within } from '@testing-library/react';
import { renderWithUrl } from '../../utils/test.utils';
import { CurrencyItemProps } from './components/currency-item/currency-item.component';
import { CurrencyList } from './currency-list.component';
import { MOCK_BASE_CURRENCY, MOCK_CURRENCIES } from '../../mocks/currency.mock';
import { NO_DATA_FOUND_TEXT } from '../../services/currency-list.service';
const mockCurrencyItemTestId = 'mockCurrencyItem';
jest.mock('./components/currency-item/currency-item.component.tsx', () => ({
  CurrencyItem: ({ item, baseCurrency }: CurrencyItemProps) => (
    <div data-testid={mockCurrencyItemTestId}>
      <p>{item.currency}</p>
      <p>{baseCurrency}</p>
    </div>
  ),
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
  it('should display "No data found" if no currencies have been passed', async () => {
    renderWithUrl(
      <CurrencyList currencies={[]} baseCurrency={MOCK_BASE_CURRENCY} />
    );
    expect(screen.getByText(NO_DATA_FOUND_TEXT)).toBeInTheDocument();
  });
});
