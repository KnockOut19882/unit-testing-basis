import { render, screen, cleanup } from '@testing-library/react';
import CurrencyForm from './CurrencyForm';
import userEvent from '@testing-library/user-event';

describe('Component CurrencyForm', () => {
  it('should run action callback with proper data on form submit', () => {
    
    const testCases = [
      { amount: 100, from: 'USD', to: 'PLN' },
      { amount: 50, from: 'USD', to: 'PLN' },
      { amount: 25, from: 'USD', to: 'PLN' },
      { amount: 100, from: 'PLN', to: 'USD' },
      { amount: 50, from: 'PLN', to: 'USD' },
      { amount: 25, from: 'PLN', to: 'USD' }
    ];

    for (const testObj of testCases) {
      const action = jest.fn();
    
    // render component
    render(<CurrencyForm action={action} />);

    // find “convert” button
    const submitButton = screen.getByText('Convert');
    
    // find inputs
    const amountInput = screen.getByTestId('amount-input');
    const fromSelect = screen.getByTestId('from-select');
    const toSelect = screen.getByTestId('to-select');
    
    //set test values to inputs
    userEvent.type(amountInput, testObj.amount.toString());
    userEvent.selectOptions(fromSelect, testObj.from);
    userEvent.selectOptions(toSelect, testObj.to);

    // simulate user click on "convert" button
    userEvent.click(submitButton);
    

      // check if action callback was called once with proper arguments
    expect(action).toHaveBeenCalledTimes(1);
    expect(action).toHaveBeenCalledWith(testObj);

      cleanup();
      }
  });
});