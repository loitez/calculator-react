import styles from './App.module.css';
import data from './data.json';
import {useState} from "react";

export const App = () => {
    const [symbols, setSymbols] = useState(data);

    const [operand1, setOperand1] = useState('');
    const [operand2, setOperand2] = useState('');
    const [operator, setOperator] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');

    function onOperandClick(symbol, e) {
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
    }



  return (


    <div className={styles.calculator}>
      <div className={styles['calculator-display'] + ' ' + (result && styles['result'])}>
          {result ? result : operand1 + operator + operand2}
          <div>

          </div>
      </div>
      <ul className={styles['calculator-buttons']}>
          {symbols.map((symbol, index) => (
              <li key={index}>
                  <button className={styles['calculator-buttons__item'] + ' ' + (Number.isNaN(parseFloat(symbol.value)) && styles.operation)} onClick={Number.isNaN(parseFloat(symbol.value)) ? (e) => onOperatorClick(symbol, e) : ((e) => onOperandClick(symbol, e))}>{symbol.value}</button>
              </li>
          ))}
      </ul>
    </div>
  );
};
