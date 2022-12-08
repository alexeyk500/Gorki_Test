import React from 'react';
import { render, screen } from '@testing-library/react';
import MainPage from './pages/MainPage/MainPage';

test('renders MainPage', () => {
  render(<MainPage />);
  const linkElement = screen.getByText(/ГК Горки/i);
  expect(linkElement).toBeInTheDocument();
});
