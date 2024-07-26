import { fireEvent, screen } from '@testing-library/react';
import { Main } from './Main';
import { renderWithUrl } from '../../utils/test.utils';

const mockSetSearchParams = jest.fn();
jest.mock('react-router-dom', () => {
  const actualModule = jest.requireActual('react-router-dom');
  return {
    ...actualModule,
    useSearchParams: () => [{}, mockSetSearchParams],
  };
});

describe('Main Page', () => {
  it('should render Search bar', async () => {
    renderWithUrl(<Main />);
    expect(await screen.findByText(/search/i)).toBeInTheDocument();
  });
  it('should set search text into url as search parameter', async () => {
    renderWithUrl(<Main />);
    const inputElement = await screen.findByLabelText(/search/i);
    const testValue = 'Test';
    fireEvent.change(inputElement, { target: { value: testValue } });
    expect(mockSetSearchParams).toHaveBeenLastCalledWith({ search: testValue });
  });
});
