import React, { useState, useMemo } from 'react';

interface MortgageCalculatorProps {
  propertyPrice: number;
}

const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({ propertyPrice }) => {
  const [downPayment, setDownPayment] = useState(propertyPrice * 0.2);
  const [interestRate, setInterestRate] = useState(8.5); // Adjusted for Indian market
  const [loanTerm, setLoanTerm] = useState(20); // Adjusted for Indian market

  const loanAmount = propertyPrice - downPayment;
  const downPaymentPercentage = propertyPrice > 0 ? (downPayment / propertyPrice) * 100 : 0;

  const monthlyPayment = useMemo(() => {
    if (loanAmount <= 0 || interestRate <= 0) return 0;

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const numerator = monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;

    if (denominator <= 0) return 0;

    return (loanAmount * (numerator / denominator));
  }, [loanAmount, interestRate, loanTerm]);

  const totalPayment = monthlyPayment * loanTerm * 12;
  const totalInterest = totalPayment > loanAmount ? totalPayment - loanAmount : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className="mt-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-gray-700">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">EMI Calculator</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Property Price</label>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{formatCurrency(propertyPrice)}</p>
        </div>
        
        <div>
          <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Down Payment ({downPaymentPercentage.toFixed(0)}%)</label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              id="downPayment"
              min="0"
              max={propertyPrice}
              step={10000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-primary-600"
            />
          </div>
          <p className="text-right font-medium text-gray-800 dark:text-gray-200">{formatCurrency(downPayment)}</p>
        </div>

        <div>
          <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Interest Rate (%)</label>
          <input
            type="number"
            id="interestRate"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 dark:placeholder-gray-400 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Term ({loanTerm} years)</label>
          <input
            type="range"
            id="loanTerm"
            min="5"
            max="30"
            step="1"
            value={loanTerm}
            onChange={(e) => setLoanTerm(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-primary-600"
          />
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center mb-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Estimated Monthly EMI</p>
            <p className="text-3xl font-extrabold text-primary-900 dark:text-primary-200">
                {formatCurrency(monthlyPayment)}
            </p>
        </div>

        <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
                <span>Principal & Interest</span>
                <span className="font-medium">{formatCurrency(monthlyPayment)}</span>
            </div>
            <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Total Interest Paid</span>
                <span className="font-medium">{formatCurrency(totalInterest)}</span>
            </div>
             <div className="flex justify-between text-gray-500 dark:text-gray-400">
                <span>Loan Amount</span>
                <span className="font-medium">{formatCurrency(loanAmount)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;