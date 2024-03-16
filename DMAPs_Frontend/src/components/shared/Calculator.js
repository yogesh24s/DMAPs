import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState('');

  const handleNumberClick = (number) => {
    if (display === '0' || operator) {
      setDisplay(number.toString());
    } else {
      setDisplay(display + number.toString());
    }
    setCurrentValue(currentValue + number.toString());
  };

  const handleOperatorClick = (op) => {
    setOperator(op);
    setPreviousValue(display);
    setCurrentValue('');
  };

  const handleEqualsClick = () => {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);

    switch (operator) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
      default:
        return;
    }

    setDisplay(result.toString());
    setCurrentValue('');
    setPreviousValue('');
    setOperator('');
  };

  const handleDecimalClick = () => {
    if (!currentValue.includes('.')) {
      setDisplay(display + '.');
      setCurrentValue(currentValue + '.');
    }
  };

  const handlePercentageClick = () => {
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
    setCurrentValue(value.toString());
  };

  const handleClearClick = () => {
    setDisplay('0');
    setCurrentValue('');
    setPreviousValue('');
    setOperator('');
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button onClick={() => handleNumberClick(1)}>1</button>
        <button onClick={() => handleNumberClick(2)}>2</button>
        <button onClick={() => handleNumberClick(3)}>3</button>
        <button className="operator" onClick={() => handleOperatorClick('+')}>+</button>
        <button onClick={() => handleNumberClick(4)}>4</button>
        <button onClick={() => handleNumberClick(5)}>5</button>
        <button onClick={() => handleNumberClick(6)}>6</button>
        <button className="operator" onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={() => handleNumberClick(7)}>7</button>
        <button onClick={() => handleNumberClick(8)}>8</button>
        <button onClick={() => handleNumberClick(9)}>9</button>
        <button className="operator" onClick={() => handleOperatorClick('*')}>*</button>
        <button onClick={() => handleNumberClick(0)}>0</button>
        <button onClick={() => handleDecimalClick()}>.</button>
        <button className="operator" onClick={() => handleOperatorClick('/')}>/</button>
        <button className="clear" onClick={() => handleClearClick()}>C</button>
        <button className="equals" onClick={() => handleEqualsClick()}>=</button>
        <button className="percentage" onClick={() => handlePercentageClick()}>%</button>
      </div>
    </div>
  );
};

export default Calculator;
