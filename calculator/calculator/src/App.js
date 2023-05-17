import React, { useState } from 'react';


const App = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [previousResult, setPreviousResult] = useState('');

  const handleNumberClick = (number) => {
    if (display === '0') {
      setDisplay(number);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperatorClick = (operator) => {
    if (operator === '-' && display === '0') {
      setDisplay('-');
    } else if (operator !== '-' && display !== '0') {
      setExpression(expression + display + operator);
      setDisplay('0');
    } else if (operator === '-' && display !== '0') {
      if (expression === '') {
        setExpression(display + operator);
        setDisplay('0');
      } else {
        const result = evaluateExpression(expression + display);
        setExpression(result.toString() + operator);
        setDisplay('0');
      }
    }
  };
  

  const handleDecimalClick = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClearClick = () => {
    setDisplay('0');
    setExpression('');
    setPreviousResult('');
  };

  const handleEqualsClick = () => {
    let result;
    if (expression && display !== '-') {
      result = evaluateExpression(expression + display);
      setPreviousResult(result);
    } else {
      result = previousResult;
    }

    setDisplay(result.toString());
    setExpression('');
  };

  const evaluateExpression = (expression) => {
    let result;
    try {
      // eslint-disable-next-line no-eval
      result = eval(expression);
    } catch (error) {
      result = 'Error';
    }
    return result;
  };

  return (
    <div className="calculator">
      <div id="expression" className="expression">{expression}</div>
      <div id="display" className="display">{display}</div>
      <div className="buttons">
        <div id='row1' className="row">
          <button id="clear" className="btn" onClick={handleClearClick}>AC</button>
          <button id="divide" className="btn operator" onClick={() => handleOperatorClick('/')}>/</button>
        </div>
        <div id='row2' className="row">
          <button id="seven" className="btn" onClick={() => handleNumberClick('7')}>7</button>
          <button id="eight" className="btn" onClick={() => handleNumberClick('8')}>8</button>
          <button id="nine" className="btn" onClick={() => handleNumberClick('9')}>9</button>
          <button id="multiply" className="btn operator" onClick={() => handleOperatorClick('*')}>*</button>
        </div>
        <div id='row3' className="row">
          <button id="four" className="btn" onClick={() => handleNumberClick('4')}>4</button>
          <button id="five" className="btn" onClick={() => handleNumberClick('5')}>5</button>
          <button id="six" className="btn" onClick={() => handleNumberClick('6')}>6</button>
          <button id="subtract" className="btn operator" onClick={() => handleOperatorClick('-')}>-</button>
        </div>
        <div id='row4' className="row">
          <button id="one" className="btn" onClick={() => handleNumberClick('1')}>1</button>
          <button id="two" className="btn" onClick={() => handleNumberClick('2')}>2</button>
          <button id="three" className="btn" onClick={() => handleNumberClick('3')}>3</button>
          <button id="add" className="btn operator" onClick={() => handleOperatorClick('+')}>+</button>
        </div>
        <div id='row5' className="row">
          <button id="zero" className="btn zero" onClick={() => handleNumberClick('0')}>0</button>
          <button id="decimal" className="btn" onClick={handleDecimalClick}>.</button>
          <button id="equals" className="btn equals" onClick={handleEqualsClick}>=</button>
        </div>
      </div>
    </div>
  );
};

export default App;
