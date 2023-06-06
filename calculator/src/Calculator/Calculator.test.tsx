import { render, screen } from '@testing-library/react';
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

  it('shows all buttons in rows', () => {
    render(<Calculator />);
    const rows = screen.getAllByRole('row');

    expect(rows.length).toEqual(5);
  });

  it('shows all operators as buttons', () => {
    render(<Calculator />);
    const operators = ['+', '-', 'X', '/', 'C', '+/-', '%', '=', '.'];

    operators.forEach((operator) => {
      const element = screen.getByText(operator);
      expect(element).toBeInTheDocument();
      expect(element.tagName).toMatch(/button/i);
    });
  });
});
