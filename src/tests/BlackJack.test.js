import React from 'react';
import { render } from '@testing-library/react';
import BlackJack from '../containers/BlackJack/BlackJack';

//TODO: add appropriate tests
test('renders learn react link', () => {
  const { getByText } = render(<BlackJack />);
  const linkElement = getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});
