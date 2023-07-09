import { fireEvent, render, screen } from '@testing-library/react';
import { NumberValues, SymbolValues } from './Calculator.types';
import { Calculator } from './Calculator';

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

  it('ignores single leading 0', () => {
    render(<Calculator />);

    const element = screen.getByText('0');
    fireEvent.click(element);

    const calculated = screen.getByRole('presentation');
    expect(calculated).toHaveValue('0');
  });

  it('ignores multiple leading 0s', () => {
    render(<Calculator />);

    const element = screen.getByText('0');
    fireEvent.click(element);
    fireEvent.click(element);
    fireEvent.click(element);

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

  it('resets the display to 0 when C (clear) is clicked', () => {
    render(<Calculator />);
    const sequence = ['3', 'C'];

    sequence.forEach((step) => {
      const element = screen.getByText(step);
      fireEvent.click(element);
    });

    const calculated = screen.getByRole('presentation');
    expect(calculated).toHaveValue('0');
  });
  it('can calculate a simple addition', () => {
    render(<Calculator />);
    const sequence = ['3', '+', '5', '='];

    sequence.forEach((step) => {
      const element = screen.getByText(step);
      fireEvent.click(element);
    });

    const calculated = screen.getByRole('presentation');
    expect(calculated).toHaveValue('8');
  });

  it('can calculate a simple subtraction', () => {
    render(<Calculator />);
    const sequence = ['5', '-', '3', '='];

    sequence.forEach((step) => {
      const element = screen.getByText(step);
      fireEvent.click(element);
    });

    const calculated = screen.getByRole('presentation');
    expect(calculated).toHaveValue('2');
  });

  it('can calculate a simple subtraction when the result is negative', () => {
    render(<Calculator />);
    const sequence = ['5', '-', '9', '='];

    sequence.forEach((step) => {
      const element = screen.getByText(step);
      fireEvent.click(element);
    });

    const calculated = screen.getByRole('presentation');
    expect(calculated).toHaveValue('-4');
  });

  it('can calculate multiple additions', () => {
    render(<Calculator />);
    const sequence = ['3', '+', '5', '=', '+', '4', '='];

    sequence.forEach((step) => {
      const element = screen.getByText(step);
      fireEvent.click(element);
    });

    const calculated = screen.getByRole('presentation');
    expect(calculated).toHaveValue('12');
  });
});
