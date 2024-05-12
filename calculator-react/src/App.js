import styles from './App.module.css';
import data from './data.json';
import {useState} from "react";
import React from 'react';
import { ReactComponent as IconSun } from './sun.svg'
import { ReactComponent as IconMoon } from './moon.svg'

export const App = () => {
    const [symbols, setSymbols] = useState(data);
    const [result, setResult] = useState('');
    const [theme, setTheme] = useState('light');
    const [expression, setExpression] = useState('0');
    const [error, setError] = useState('');
    let isFirstBracket = expression.indexOf('(') !== -1;
    let isLastBracket = expression.indexOf(')') !== -1;

    function onOperandClick(symbol) {
        setError('')
        setResult('')
        if (expression.length === 12) {
            setError('Извините, вы не можете ввести больше 12 символов')
            return
        }
        if (expression[0] === '0') {
            if (symbol.value === '0') {
                if (String(expression).length === 1) {
                    return
                } else {
                    setExpression(expression + symbol.value)
                }
            } else {
                expression.length > 1 ? setExpression(expression + symbol.value) : setExpression(symbol.value)
            }

        }
            else {
                result ? setExpression(result + symbol.value) : setExpression(expression + symbol.value)
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
                if (result) {
                    result.length === 1 ? setExpression('0') : setExpression(result.slice(0, -1))
                } else {
                    let updatedExpression = expression.slice(0, -1)
                    expression.length === 1 ? setExpression('0') : setExpression(updatedExpression)
                }
                break
            case 'С':
                setExpression('0')
                setResult('')
                setError('')
                break;
            case '=':
                if (expression) {
                    let updatedExpression = expression;
                    if (isFirstBracket && !isLastBracket) {
                        setExpression(expression + ')')
                        updatedExpression = expression + ')'
                    }
                    if (Number.isNaN(parseFloat(expression[expression.length - 1]))) {
                        setError('Введите операнд')
                        setExpression(expression)
                    } else {
                        let operationResult = eval(updatedExpression)
                        String(operationResult).length > 13 ? setResult(operationResult.toFixed(8)) : setResult(String(operationResult))
                        setExpression('0')
                    }
                } else {
                    setResult(result)
                }
                break;
            case '( )':
                if (expression !== '0') {
                    if (isFirstBracket) {
                        setExpression(expression + ')')
                    } else if (Number.isNaN(parseFloat(expression[expression.length - 1]))) {
                        setExpression(expression + '(')
                    } else {
                        setExpression(expression + '*(')
                    }
                } else {
                    result ? setExpression(result + '*(') : setExpression('(')
                }
                break
            case '-':
                expression === '0' ? setExpression('-') : setExpression(expression + symbol.value)

        }
    }

    function watchSwitch() {
        theme === 'light' ? setTheme('dark') : setTheme('light');
        return theme
    }

  return (
    <div className={styles.calculator}>
        <div className={styles['calculator-display'] + ' ' + (result && styles['result'] + ' ') + styles['calculator-display_' + theme]}>
                <label className={styles['switch-theme-button']}>
                    <input type="checkbox" onClick={() => watchSwitch(this)}/>
                    <span className={styles['slider'] + ' ' + styles['round'] + ' ' + theme}>
                        {theme === 'dark' && <IconMoon className={styles["switch-theme-icon_dark"]}/>}
                        {theme === 'light' && <IconSun className={styles["switch-theme-icon_light"]}/>}


                    </span>
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
