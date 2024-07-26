import { screen } from '@testing-library/react';
import { renderWithUrl } from './utils/test.utils';
import App from './app.component';
describe('App', () => {
  it('should render header', () => {
    renderWithUrl(<App />);
    const header = screen.getByText(/george fe test/i);
    expect(header).toBeInTheDocument();
  });
});
