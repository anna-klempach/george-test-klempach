import { screen } from '@testing-library/react';
import App from './App';
import { renderWithUrl } from './utils/test.utils';
describe('App', () => {
  it('should render header', () => {
    renderWithUrl(<App />);
    const header = screen.getByText(/george fe test/i);
    expect(header).toBeInTheDocument();
  });
});
