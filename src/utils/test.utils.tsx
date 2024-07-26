import { Queries, render, RenderOptions } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

export function renderWithUrl(
  ui: React.ReactElement,
  url?: string,
  renderOptions?: RenderOptions<Queries, HTMLElement, HTMLElement>
) {
  return render(
    <MemoryRouter initialEntries={[url || '']}>{ui}</MemoryRouter>,
    renderOptions
  );
}
