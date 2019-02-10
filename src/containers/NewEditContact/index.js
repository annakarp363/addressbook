import React, { Component } from 'react';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { matchPath, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { withRouter } from 'react-router';
import * as _ from 'lodash';
import Routes from 'providers/Routes';
import { validateEmail } from 'constants.js';
import Input from 'shared/Input';
import Button from 'shared/Button';
import {
  addUserRequest,
  clearCurrentUser,
  editUserRequest,
  removeUserRequest,
  searchUserByIdRequest,
} from 'store/users/actions';

import styles from './index.module.css';

class NewEditContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNew: false,
      name: '',
      email: '',
      id: '',
      validEmail: true,
      toDashboard: false
    };
  }

  componentDidMount() {
    const { location: { pathname } } = this.props;

    const match = matchPath(pathname, {
      path: '/contact/:id',
      exact: false,
      strict: false,
    });

    if (!match) {
      this.setState({ isNew: true });
      return;
    }

    const { params: { id: userId } } = match;
    searchUserByIdRequest(userId);
  }

  componentWillReceiveProps({ current = {} }) {
    const { id, name, email } = this.state;
    if (current.handled) {
      this.setState({ toDashboard: true });
    } else if (!_.isEqual(current, { id, name, email })) {
      this.setState({ ...current });
    }
  }

  componentWillUnmount() {
    clearCurrentUser();
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { isNew, id, name, email } = this.state;
    isNew ? addUserRequest({ name, email }) : editUserRequest({ id, name, email });
  };

  deleteUser = (e) => {
    e.preventDefault();
    removeUserRequest(this.state.id);
  };

  validateEmail = () => {
    const { email } = this.state;
    const validEmail = validateEmail.test(email.toLowerCase());
    this.setState({ validEmail })
  };

  render() {
    const { isNew, name, email, validEmail, toDashboard } = this.state;
    const breadcrumb = `${ isNew ? 'New' : 'Edit' } ${ Routes.contacts.name }`;

    return <>
      {
        toDashboard && <Redirect to='/'/>
      }
      <BreadcrumbsItem className={ styles.title } to={ Routes.contacts.path }>{ breadcrumb }</BreadcrumbsItem>
      <form className={ styles.newEditContact } onSubmit={ this.handleSubmit }>
        <Input
          placeholder="Name"
          onChange={ this.handleChange }
          id="name"
          value={ name }
        />
        <Input
          placeholder="Email"
          onChange={ this.handleChange }
          id="email"
          value={ email }
          onBlur={ this.validateEmail }
          isValid={ validEmail }
          validateMessage="Please enter valid email"
        />
        <div className={ styles.buttonsWrapper }>
          {
            !isNew &&
            <Button
              text='Delete'
              dataRole='delete'
              onClick={ this.deleteUser }
              className={ styles.leftButton }
            />
          }
          <Button
            dataRole='link'
            text='Cancel'
            to={ Routes.main.path }
          />
          <Button
            text='Ok'
            dataRole='save'
            className={ styles.rightButton }
            disabled={ !validEmail }
          />
        </div>
      </form>
    </>
  }
}

const mapStateToProps = state => ({
  current: state.users.current,
});

export default withRouter(connect(mapStateToProps, null)(NewEditContact));
