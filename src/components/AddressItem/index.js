import React from 'react';
import { Link } from 'react-router-dom';
import { removeUserRequest } from 'store/users/actions'

import styles from './index.module.css';

const AddressItem = ({ item }) => (
  <div className={ styles.addressItem }>
    <Link to={ `/contact/${ item.id }` } className={ styles.name }>{ item.name }</Link>
    <p className={ styles.email }>{ item.email }</p>
    <button className={ styles.deleteButton } onClick={ () => removeUserRequest(item.id) }/>
  </div>
);

export default AddressItem;
