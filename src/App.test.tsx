import { render, screen } from '@testing-library/react';
import App from './App';
describe('App', () => {
  it('should render header', () => {
    render(<App />);
    const header = screen.getByText(/george test/i);
    expect(header).toBeInTheDocument();
  });
});
