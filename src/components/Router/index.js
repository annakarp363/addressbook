import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Breadcrumbs, BreadcrumbsItem } from 'react-breadcrumbs-dynamic';
import { withRouter } from 'react-router';
import Routes from 'providers/Routes';
import { getUsersRequest } from 'store/users/actions'
import AddressList from 'containers/AddressList';
import NewEditContact from 'containers/NewEditContact';

import styles from './index.module.css';

class Router extends Component {

  componentDidMount() {
    getUsersRequest();
  }

  render() {
    return (
      <div className={ styles.page }>
        <Breadcrumbs separator={ <span> / </span> } item={ Link }/>
        <BreadcrumbsItem to={ Routes.main.path } className={ styles.title }>{ Routes.main.name }</BreadcrumbsItem>
        <Switch>
          <Route exact path={ Routes.main.path } component={ AddressList }/>
          <Route path={ Routes.contacts.path } component={ NewEditContact }/>
          <Route path={ `${ Routes.contacts.path }/:id` } component={ NewEditContact }/>
        </Switch>
      </div>
    )
  }
}

export default withRouter(Router);
