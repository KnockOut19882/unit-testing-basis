import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
  
describe('Component ResultBox', () => {
  it('should render correctly with given props', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });
  
  it('should render proper info about conversion when PLN -> USD', () => {
    const testCases = [
      { amount: 100, from: 'PLN', to: 'USD', expected: 'PLN 100.00 = $28.57' },
      { amount: 50, from: 'PLN', to: 'USD', expected: 'PLN 50.00 = $14.29' },
      { amount: 25, from: 'PLN', to: 'USD', expected: 'PLN 25.00 = $7.14' },
      { amount: 12, from: 'PLN', to: 'USD', expected: 'PLN 12.00 = $3.43' },
    ];
    for (const testCase of testCases) {
      render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);
      const output = screen.getByTestId('result-box');
      expect(output).toHaveTextContent(testCase.expected);
      cleanup();
    }
  });

  it('should render proper info about conversion when USD -> PLN', () => {
    const testCases = [
      { amount: 100, from: 'USD', to: 'PLN', expected: '$100.00 = PLN 350.00' },
      { amount: 50, from: 'USD', to: 'PLN', expected: '$50.00 = PLN 175.00' },
      { amount: 25, from: 'USD', to: 'PLN', expected: '$25.00 = PLN 87.50' },
      { amount: 12, from: 'USD', to: 'PLN', expected: '$12.00 = PLN 42.00' },
    ];
    for (const testCase of testCases) {
      render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);
      const output = screen.getByTestId('result-box');
      expect(output).toHaveTextContent(testCase.expected);
      cleanup();
    }
  });

  it('should render proper info about conversion when PLN -> PLN or USD -> USD', () => {
    const testCases = [
      { amount: 100, from: 'PLN', to: 'PLN', expected: 'PLN 100.00 = PLN 100.00' },
      { amount: 50, from: 'PLN', to: 'PLN', expected: 'PLN 50.00 = PLN 50.00' },
      { amount: 25, from: 'PLN', to: 'PLN', expected: 'PLN 25.00 = PLN 25.00' },
      { amount: 12, from: 'PLN', to: 'PLN', expected: 'PLN 12.00 = PLN 12.00' },
      { amount: 100, from: 'USD', to: 'USD', expected: '$100.00 = $100.00' },
      { amount: 50, from: 'USD', to: 'USD', expected: '$50.00 = $50.00' },
      { amount: 25, from: 'USD', to: 'USD', expected: '$25.00 = $25.00' },
      { amount: 12, from: 'USD', to: 'USD', expected: '$12.00 = $12.00' },
    ];
    for (const testCase of testCases) {
      render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);
      const output = screen.getByTestId('result-box');
      expect(output).toHaveTextContent(testCase.expected);
      cleanup();
    }
  });

  it('should render wrong value when amount is negative or zero', () => {
    const testCases = [
      { amount: 0, from: 'PLN', to: 'USD', expected: 'Wrong value…' },
      { amount: -50, from: 'PLN', to: 'USD', expected: 'Wrong value…' },
      { amount: -25, from: 'USD', to: 'PLN', expected: 'Wrong value…' },
    ];
    for (const testCase of testCases) {
      render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);
      const output = screen.getByTestId('result-box');
      expect(output).toHaveTextContent(testCase.expected);
      cleanup();
    }
  });

  it('should render wrong value when amount is NaN or invalid', () => {
    const testCases = [
      { amount: NaN, from: 'PLN', to: 'USD', expected: 'Wrong value…' },
      { amount: 'invalid', from: 'PLN', to: 'USD', expected: 'Wrong value…' },
      { amount: null, from: 'USD', to: 'PLN', expected: 'Wrong value…' },
    ];
    for (const testCase of testCases) {
      render(<ResultBox from={testCase.from} to={testCase.to} amount={testCase.amount} />);
      const output = screen.getByTestId('result-box');
      expect(output).toHaveTextContent(testCase.expected);
      cleanup();
    }
  });
});