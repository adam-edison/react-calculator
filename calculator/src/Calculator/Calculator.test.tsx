import { render, screen } from '@testing-library/react';
import React from 'react';
import { Calculator } from './Calculator';

describe('<Calculator />', () => {
  it('shows number buttons 0-9', () => {
    render(<Calculator />);
    const numbers = [];

    for (let i = 0; i <= 9; i++) {
      numbers.push(i);
    }

    numbers.forEach((number) => {
      const text = number.toString();
      const element = screen.getByText(text);
      expect(element).toBeInTheDocument();
      expect(element.tagName).toMatch(/button/i);
    });
  });
});
