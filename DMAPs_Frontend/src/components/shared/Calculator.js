import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState('');

  const handleNumberClick = (number) => {
    if (operator) {
      // If an operator is already set, append the number to the current value
      setCurrentValue(currentValue + number.toString());
      setDisplay(display + number.toString());
    } else {
      // If no operator is set, handle as usual
      if (display === '0') {
        setDisplay(number.toString());
      } else {
        setDisplay(display + number.toString());
      }
      setCurrentValue(currentValue + number.toString());
    }
  };
  

  const handleOperatorClick = (op) => {
    // Only update the display if currentValue is not empty
    if (currentValue !== '') {
      setOperator(op);
      setPreviousValue(display);
      setCurrentValue('');
      // Append the operator to the display along with the current value
      setDisplay(display + ' ' + op + ' ');
    }
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

  const handleBackspaceClick = () => {
    setDisplay(display.slice(0, -1));
    setCurrentValue(currentValue.slice(0, -1));
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="clear" onClick={handleClearClick}>AC</button>
        <button className="backspace" onClick={handleBackspaceClick}><i class="fa-solid fa-delete-left"></i></button> {/* Backspace button */}
        <button className="operator" onClick={() => handleOperatorClick('/')}>/</button>
        <button className="operator" onClick={handlePercentageClick}>%</button>
        <button onClick={() => handleNumberClick(7)}>7</button>
        <button onClick={() => handleNumberClick(8)}>8</button>
        <button onClick={() => handleNumberClick(9)}>9</button>
        <button className="operator" onClick={() => handleOperatorClick('*')}>*</button>
        <button onClick={() => handleNumberClick(4)}>4</button>
        <button onClick={() => handleNumberClick(5)}>5</button>
        <button onClick={() => handleNumberClick(6)}>6</button>
        <button className="operator" onClick={() => handleOperatorClick('-')}>-</button>
        <button onClick={() => handleNumberClick(1)}>1</button>
        <button onClick={() => handleNumberClick(2)}>2</button>
        <button onClick={() => handleNumberClick(3)}>3</button>
        <button className="operator" onClick={() => handleOperatorClick('+')}>+</button>
        <button onClick={() => handleNumberClick(0)}>0</button>
        <button onClick={handleDecimalClick}>.</button>
        <button className="equals operator" onClick={handleEqualsClick}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
