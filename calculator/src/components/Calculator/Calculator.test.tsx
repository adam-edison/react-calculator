import { fireEvent, render, screen } from '@testing-library/react';
import { Calculator, NumberValues, SymbolValues } from './Calculator';

describe('<Calculator />', () => {
  it('shows number buttons 0-9', () => {
    render(<Calculator />);

    // OK with coupling here
    // equivalent statement: all numbers enumerated in the app should be displayed
    const numbers = Array.from(NumberValues);

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

  it('shows all operator buttons', () => {
    render(<Calculator />);
    // OK with coupling here
    // equivalent statement: all symbols enumerated in the app should be displayed as buttons
    const operators = Array.from(SymbolValues);

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

    // OK with coupling here
    // equivalent statement: all numbers enumerated in the app should be usable as buttons
    const numbers = Array.from(NumberValues);

    // sort descending so all values will show in sequence
    numbers.sort((a, b) => b - a);
    numbers.forEach((n) => {
      const element = screen.getByText(n);
      fireEvent.click(element);
    });

    const calculated = screen.getByDisplayValue('9876543210');
    expect(calculated).toBeInTheDocument();
  });

  it('defaults to 0 value when loaded', () => {
    render(<Calculator />);

    const calculated = screen.getByRole('presentation');
    expect(calculated).toHaveValue('0');
  });

  it('does not display an operation when clicked', () => {
    render(<Calculator />);

    // OK with coupling here
    // equivalent statement: all numbers enumerated in the app should be usable as buttons
    const operations = Array.from(SymbolValues);

    operations.forEach((n) => {
      const element = screen.getByText(n);
      fireEvent.click(element);

      const calculated = screen.getByRole('presentation');
      expect(calculated).toHaveValue('0');
    });
  });
});
