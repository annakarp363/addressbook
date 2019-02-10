import React from 'react';

import styles from './index.module.css';

const Input = ({
  placeholder = '',
  onChange = () => {},
  id = '',
  value = '',
  onBlur = () => {},
  className = '',
  isValid = true,
  validateMessage = ''
}) => (
  <div className={ styles.inputWrapper }>
    <input
      className={ `${ styles.input } ${ styles[className] } ${ isValid ? '' : styles.invalid }` }
      placeholder={ placeholder }
      onChange={ (e) => onChange(e) }
      id={ id }
      value={ value }
      onBlur={ (e) => onBlur(e) }
    />
    { !isValid && <p className={ styles.validateMessage }>{ validateMessage }</p> }
  </div>
);

export default Input;
