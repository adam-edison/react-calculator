import { fireEvent, getByText, render, screen } from '@testing-library/react';
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

  it('renders numeric main display as a disabled input', () => {
    render(<Calculator />);
    const element = screen.getByRole('presentation');
    expect(element).toBeInTheDocument();
    expect(element.tagName).toMatch(/input/i);
    expect(element).toBeDisabled();
  });

  it('displays the number when a number button is clicked', () => {
    render(<Calculator />);

    // press all number buttons from 9 to 0
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    numbers.sort((a, b) => b - a); // sort descending so all values will show in sequence
    numbers.forEach((n) => {
      const element = screen.getByText(n);
      fireEvent.click(element);
    });

    const calculated = screen.getByDisplayValue('9876543210');
    expect(calculated).toBeInTheDocument();
  });
});
