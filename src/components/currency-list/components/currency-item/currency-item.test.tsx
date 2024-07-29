import { fireEvent, screen } from '@testing-library/react';
import { renderWithUrl } from '../../../../utils/test.utils';
import { CurrencyItem } from './currency-item.component';
import { NOT_AVAILABLE_TEXT } from '../../../../services/currency-list.service';
import {
  MOCK_BASE_CURRENCY,
  MOCK_CURRENCY,
} from '../../../../mocks/currency.mock';

describe('Currency Item', () => {
  it('should display currency name', async () => {
    renderWithUrl(
      <CurrencyItem
        currency={MOCK_CURRENCY.currency}
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );
    expect(await screen.findByText(MOCK_CURRENCY.currency)).toBeInTheDocument();
  });

  it('should display base currency name if exchange rate is provided', async () => {
    renderWithUrl(
      <CurrencyItem
        currency={MOCK_CURRENCY.currency}
        exchangeRate="1.50"
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );
    expect(await screen.findByText(MOCK_BASE_CURRENCY)).toBeInTheDocument();
  });

  it('should display exchange rate if exchange rate is provided', async () => {
    const exchangeRate = MOCK_CURRENCY.exchangeRate!.middle.toString();
    renderWithUrl(
      <CurrencyItem
        currency={MOCK_CURRENCY.currency}
        exchangeRate={exchangeRate}
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );
    expect(await screen.findByText(exchangeRate)).toBeInTheDocument();
  });
  it('should display "N/A" if exchange rate is not provided', async () => {
    renderWithUrl(
      <CurrencyItem
        currency={MOCK_CURRENCY.currency}
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );
    expect(await screen.findByText(NOT_AVAILABLE_TEXT)).toBeInTheDocument();
  });
  it('should be null if there is neither currency nor currency name is provided', async () => {
    const { container } = renderWithUrl(
      <CurrencyItem baseCurrency={MOCK_BASE_CURRENCY} />
    );
    expect(container).toBeEmptyDOMElement();
  });
  it('should be null if currency is the same as base currency', async () => {
    const { container } = renderWithUrl(
      <CurrencyItem
        currency={MOCK_BASE_CURRENCY}
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );
    expect(container).toBeEmptyDOMElement();
  });
  it('should display image if there is currency', async () => {
    const existingCurrency = 'PEN';
    renderWithUrl(
      <CurrencyItem
        currency={existingCurrency}
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );

    expect(await screen.findByAltText(existingCurrency)).toBeInTheDocument();
  });
  it('should not display image if image failed to load', async () => {
    renderWithUrl(
      <CurrencyItem
        currency={MOCK_CURRENCY.currency}
        baseCurrency={MOCK_BASE_CURRENCY}
      />
    );
    const imageElement = await screen.findByAltText(MOCK_CURRENCY.currency);
    fireEvent.error(imageElement);
    expect(
      screen.queryByAltText(MOCK_CURRENCY.currency)
    ).not.toBeInTheDocument();
  });
});
