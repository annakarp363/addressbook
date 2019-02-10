import React from 'react';
import { withRouter } from 'react-router';
import Routes from 'providers/Routes';

const Breadcrumbs = (props) => {
  const { location: { pathname } } = props;
  const names = pathname.split('/');
  let crumbs = Object.values(Routes).filter(v => names.includes(v.path)).map(v => v.name);
  crumbs = [ Routes.main.name, ...crumbs ].join(' / ');

  return <h1>{ crumbs }</h1>;
};

export default withRouter(Breadcrumbs);