import { screen } from '@testing-library/react';
import { renderWithUrl } from '../../utils/test.utils';
import { CurrencyItemProps } from './components/currency-item/currency-item.component';
import { CurrencyList } from './currency-list.component';
import { MOCK_CURRENCIES, MOCK_CURRENCY } from '../../mocks/currency.mock';
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
    renderWithUrl(<CurrencyList currencies={MOCK_CURRENCIES} />);
    const currencyItemElements = await screen.findAllByTestId(
      mockCurrencyItemTestId
    );
    expect(currencyItemElements.length).toBe(MOCK_CURRENCIES.length);
  });
  it('should display "No data found" if no currencies have been passed', async () => {
    renderWithUrl(<CurrencyList currencies={[]} />);
    expect(screen.getByText(NO_DATA_FOUND_TEXT)).toBeInTheDocument();
  });
  it('should not render currency item if there is no currency', async () => {
    const currenciesListWithoutName = [
      {
        ...MOCK_CURRENCY,
        currency: '',
      },
    ];
    renderWithUrl(<CurrencyList currencies={currenciesListWithoutName} />);
    const currencyItemElement = screen.queryByTestId(mockCurrencyItemTestId);
    expect(currencyItemElement).toBeNull();
  });
});
