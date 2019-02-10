import React from 'react';
import { Link } from 'react-router-dom';

import styles from './index.module.css';

const Button = ({
  text = '',
  dataRole = '',
  className = '',
  onClick = () => {},
  disabled = false,
  to
}) => (
  <>
    { dataRole === 'link'
      ? <Link className={ `${ styles.button } ${ styles[dataRole] } ${ className }` } to={ to }>{ text }</Link>
      : <button
        className={ `${ styles.button } ${ styles[dataRole] } ${ className }` }
        onClick={ (e) => onClick(e) }
        disabled={ disabled }
      >
        { text }
      </button>
    }

  </>
);

export default Button;
