import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { filter } from 'services/Utils';
import * as _ from 'lodash';
import AddressItem from 'components/AddressItem';

import styles from './index.module.css';

class AddressList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: props.users,
      filterValue: '',
    };
  }

  handleChange = (event) => {
    const { target: { value: filterValue = '' } } = event;
    this.setState({ filterValue });
  };

  componentWillReceiveProps({ users }) {
    if (!_.isEqual(users, this.state.users)) {
      this.setState({ users });
    }
  }

  renderFiltered = () => {
    const { users, filterValue } = this.state;
    const filtered = filter(users, filterValue);
    return filtered.map((item, index) => <AddressItem item={ item } key={ index }/>)
  };

  render() {
    return (
      <div className={ styles.addressList }>
        <input className={ styles.searchBar } placeholder="searchbar" onChange={ (e) => this.handleChange(e) }/>
        {
          this.renderFiltered()
        }
        <Link to='/contact' className={ styles.addButton }/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users.list
});

AddressList.defaultProps = {
  users: [],
};

export default connect(mapStateToProps, null)(AddressList);
