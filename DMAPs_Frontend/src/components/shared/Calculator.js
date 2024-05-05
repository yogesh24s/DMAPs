import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [currentValue, setCurrentValue] = useState('');
  const [previousValue, setPreviousValue] = useState('');
  const [operator, setOperator] = useState('');

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (!isNaN(key) || key === '.') {
        // Handle number and decimal key presses
        handleNumberKeyPress(key);
      } else if (['+', '-', 'x', '/'].includes(key)) {
        // Handle operator key presses
        handleOperatorKeyPress(key);
      } else if (key === 'Enter') {
        // Handle equals key press
        handleEqualsKeyPress();
      } else if (key === 'Backspace') {
        // Handle backspace key press
        handleBackspaceKeyPress();
      } else if (key === 'Escape') {
        // Handle clear key press
        handleClearKeyPress();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [display, currentValue, operator, previousValue]);

  const handleNumberKeyPress = (key) => {
    if (operator) {
      setCurrentValue(currentValue + key);
      setDisplay(display + key);
    } else {
      if (display === '0') {
        setDisplay(key);
      } else {
        setDisplay(display + key);
      }
      setCurrentValue(currentValue + key);
    }
  };

  const handleOperatorKeyPress = (key) => {
    if (currentValue !== '') {
      setOperator(key);
      setPreviousValue(display);
      setCurrentValue('');
      setDisplay(display + ' ' + key + ' ');
    }
  };

  const handleEqualsKeyPress = () => {
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
      case 'x':
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

  const handleBackspaceKeyPress = () => {
    const newDisplay = display.slice(0, -1) || '0'; // Ensure display is at least '0'
    const newCurrentValue = currentValue.slice(0, -1) || ''; // Ensure currentValue is not null
  
    setDisplay(newDisplay);
    setCurrentValue(newCurrentValue);
  };
  
  const handleClearKeyPress = () => {
    setDisplay('0');
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

  return (
    <div className="calculator">
      <div className="display">{display}</div>
      <div className="buttons">
        <button className="clear calc-btn" onClick={handleClearKeyPress}>AC</button>
        <button className="backspace calc-btn" onClick={handleBackspaceKeyPress}><i className="fa-solid fa-delete-left"></i></button> {/* Backspace button */}
        <button className="operator calc-btn" onClick={() => handleOperatorKeyPress('/')}><i className="fa-solid fa-divide"></i></button>
        <button className="operator calc-btn" onClick={handlePercentageClick}> <i className="fa-solid fa-percent"></i> </button>
        <button className='calc-btn' onClick={() => handleNumberKeyPress('7')}>7</button>
        <button className='calc-btn' onClick={() => handleNumberKeyPress('8')}>8</button>
        <button className='calc-btn' onClick={() => handleNumberKeyPress('9')}>9</button>
        <button className="operator calc-btn" onClick={() => handleOperatorKeyPress('x')}><i className="fa-solid fa-xmark"></i></button>
        <button className='calc-btn' onClick={() => handleNumberKeyPress('4')}>4</button>
        <button className='calc-btn' onClick={() => handleNumberKeyPress('5')}>5</button>
        <button className='calc-btn' onClick={() => handleNumberKeyPress('6')}>6</button>
        <button className="operator calc-btn" onClick={() => handleOperatorKeyPress('-')}> <i className="fa-solid fa-minus"></i> </button>
        <button className='calc-btn' onClick={() => handleNumberKeyPress('1')}>1</button>
        <button className='calc-btn' onClick={() => handleNumberKeyPress('2')}>2</button>
        <button className='calc-btn' onClick={() => handleNumberKeyPress('3')}>3</button>
        <button className="operator calc-btn" onClick={() => handleOperatorKeyPress('+')}> <i className="fa-solid fa-plus"></i> </button>
        <button className='calc-btn' onClick={handleDecimalClick}>.</button>
        <button className='calc-btn' onClick={() => handleNumberKeyPress('0')}>0</button>
      </div>
      <div className='calc'>
        <button className="operator calc-btn" onClick={handleEqualsKeyPress}> <i className="fa-solid fa-equals"></i> </button>
      </div>
    </div>
  );
};

export default Calculator;
