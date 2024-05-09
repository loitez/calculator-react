import styles from './App.module.css';
import data from './data.json';
import {useState} from "react";
import React from 'react';

export const App = () => {
    const [symbols, setSymbols] = useState(data);

    const [operand1, setOperand1] = useState('');
    const [operand2, setOperand2] = useState('');
    const [operator, setOperator] = useState('');
    const [result, setResult] = useState('');
    const [theme, setTheme] = useState('light');
    const [expression, setExpression] = useState('0');
    const [error, setError] = useState('');
    let isFirstBracket = expression.indexOf('(') !== -1;


    /*function onOperandClick(symbol, e) {
        setResult('')
        operator ? setOperand2(operand2 + symbol.value) : setOperand1(operand1 + symbol.value)
    }
    function onOperatorClick(symbol, e) {
        if (symbol.value === 'С') {
            setOperand2('')
            setOperand1('')
            setOperator('')
            setResult('')
        }
        else if (symbol.value === '=') {
            if (operand1 && operator && operand2) {
                let operationResult = eval(operand1 + ` ${operator} ` + operand2)
                setResult(String(operationResult))
                setOperand2('')
            }
                // else {
            //     setError('Введите пример')
            // }
        } else {
            if (result) {
                setOperand1(result)
                setResult('')
            }
            if (operand1) {
                setOperator(symbol.value)
            }
             // operand1 ?  setOperator(symbol.value) : setError('Введите первый операнд')
        }
    }*/

    function onOperandClick(symbol) {
        setResult('')
        if (expression.length === 12) {
            setError('Извините, вы не можете ввести больше 12 значений')
            return
        }
        if (expression[0] === '0') {
            console.log('here')
            let updatedExpression = symbol.value;
            console.log(updatedExpression)
            setExpression(updatedExpression);
        } else {
            if (symbol.value === '0') {
                return
            }
            else {
                result ? setExpression(result + symbol.value) : setExpression(expression + symbol.value)
            }
        }

    }

    function onOperatorClick(symbol) {
        if (result) {
            setResult('');
            setExpression(result + symbol.value)
        } else {
            Number.isNaN(parseFloat(expression[expression.length - 1])) && expression[expression.length - 1] !== ')' ? setExpression(expression.slice(0, -1) + symbol.value) : setExpression(expression + symbol.value)
        }
        switch (symbol.value) {
            case '←':
                setError('')
                let updatedExpression = expression.slice(0, -1)
                setExpression(updatedExpression)
                break
            case 'С':
                setExpression('0')
                setResult('')
                setError('')
                break;
            case '=':
                if (expression) {
                    let updatedExpression = expression;
                    if (isFirstBracket) {
                        setExpression(expression + ')')
                        updatedExpression = expression + ')'
                    }
                    let operationResult = eval(updatedExpression)
                    if (String(operationResult).length > 13) {
                        operationResult = operationResult.toFixed(10)
                    }
                    setResult(String(operationResult))
                    setOperand2('')
                    setExpression('0')
                    break;
                } else {
                    setResult(result)
                }
            case '( )':
                if (expression) {
                    if (isFirstBracket) {
                        setExpression(expression + ')')
                    } else if (Number.isNaN(parseFloat(expression[expression.length - 1]))) {
                        setExpression(expression + '(')
                    } else {
                        setExpression(expression + '*' + '(')
                    }
                } else {
                    setExpression('(')
                }

        }
    }

    function watchSwitch() {
        theme === 'light' ? setTheme('dark') : setTheme('light');
        console.log(theme)
    }


  return (
    <div className={styles.calculator}>
        <div className={styles['calculator-display'] + ' ' + (result && styles['result'] + ' ') + styles['calculator-display_' + theme]}>
                <label className={styles['switch-theme-button']}>
                    <input type="checkbox" onClick={() => watchSwitch(this)}/>
                    <span className={styles['slider'] + ' ' + styles['round']}></span>
                </label>
            <div>
                {result ? result : expression}
            </div>
            <div className={styles['error-message'] + ' ' + (error && styles['error-visible'])}>
                {error}
            </div>
        </div>
        <ul className={styles['calculator-buttons'] + ' ' + styles['calculator-buttons_' + theme]}>
            {symbols.map((symbol, index) => (
                <li key={index} className={styles[symbol.class]}>
                    <button className={styles['calculator-buttons__item'] + ' ' + (Number.isNaN(parseFloat(symbol.value)) && styles['operation']) + ' ' + styles['calculator-buttons__item_' + theme] } onClick={Number.isNaN(parseFloat(symbol.value)) ? (e) => onOperatorClick(symbol, e) : ((e) => onOperandClick(symbol, e))}>{symbol.value}</button>
              </li>
          ))}
      </ul>
    </div>
  );
};
