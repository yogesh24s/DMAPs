import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [expression, setExpression] = useState('');

  const handleClearKeyPress = () => {
    setDisplay('0');
    setCurrentValue('');
    setExpression('');
  };

  const handleNumberKeyPress = (key) => {
    if (currentValue.includes('.') && key === '.') return; // Avoid multiple decimals

    const newValue = currentValue + key;
    setCurrentValue(newValue);
    setDisplay(display === '0' || display === 'Infinity' || display === '-Infinity' ? key : display + key);
  };

  const handleOperatorKeyPress = (key) => {
    if (currentValue !== '' || key === '-') {
      setExpression(expression + currentValue + key);
      setDisplay(display + ' ' + key + ' ');
      setCurrentValue('');
    }
  };

  const handleEqualsKeyPress = () => {
    if (currentValue !== '') {
      const fullExpression = expression + currentValue;
      try {
        const result = eval(fullExpression.replace(/x/g, '*'));
        setDisplay(result.toString());
        setCurrentValue(result.toString());
        setExpression('');
      } catch (error) {
        setDisplay('Error');
      }
    }
  };

  const handleBackspaceKeyPress = () => {
    if (currentValue) {
      const newValue = currentValue.slice(0, -1) || '0';
      setCurrentValue(newValue);
      setDisplay(display.slice(0, -1) || '0');
    }
  };

  const handleDecimalClick = () => {
    if (!currentValue.includes('.')) {
      const newValue = currentValue + '.';
      setCurrentValue(newValue);
      setDisplay(display + '.');
    }
  };

  const handlePercentageClick = () => {
    const value = parseFloat(currentValue || display) / 100;
    setDisplay(value.toString());
    setCurrentValue(value.toString());
    setExpression('');
  };

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="clear calc-btn" onClick={handleClearKeyPress}>AC</button>
        <button className="backspace calc-btn" onClick={handleBackspaceKeyPress}><i className="fa-solid fa-delete-left"></i></button>
        <button className="operator calc-btn" onClick={handlePercentageClick}><i className="fa-solid fa-percent"></i></button>
        <button className="operator calc-btn" onClick={() => handleOperatorKeyPress('/')}><i className="fa-solid fa-divide"></i></button>
        <button className="calc-btn" onClick={() => handleNumberKeyPress('7')}>7</button>
        <button className="calc-btn" onClick={() => handleNumberKeyPress('8')}>8</button>
        <button className="calc-btn" onClick={() => handleNumberKeyPress('9')}>9</button>
        <button className="operator calc-btn" onClick={() => handleOperatorKeyPress('x')}><i className="fa-solid fa-xmark"></i></button>
        <button className="calc-btn" onClick={() => handleNumberKeyPress('4')}>4</button>
        <button className="calc-btn" onClick={() => handleNumberKeyPress('5')}>5</button>
        <button className="calc-btn" onClick={() => handleNumberKeyPress('6')}>6</button>
        <button className="operator calc-btn" onClick={() => handleOperatorKeyPress('-')}><i className="fa-solid fa-minus"></i></button>
        <button className="calc-btn" onClick={() => handleNumberKeyPress('1')}>1</button>
        <button className="calc-btn" onClick={() => handleNumberKeyPress('2')}>2</button>
        <button className="calc-btn" onClick={() => handleNumberKeyPress('3')}>3</button>
        <button className="operator calc-btn" onClick={() => handleOperatorKeyPress('+')}><i className="fa-solid fa-plus"></i></button>
        <button className="calc-btn" onClick={handleDecimalClick}>.</button>
        <button className="calc-btn" onClick={() => handleNumberKeyPress('0')}>0</button>
        <button className="operator calc-btn" onClick={handleEqualsKeyPress}><i className="fa-solid fa-equals"></i></button>
      </div>
    </div>
  );
};

export default Calculator;
