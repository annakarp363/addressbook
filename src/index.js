import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic'
import store from 'store/store';
import Router from 'components/Router';
import * as serviceWorker from './serviceWorker';

import './index.css';

const App = () => (
  <Provider store={ store }>
    <BreadcrumbsProvider>
      <BrowserRouter>
        <Router/>
      </BrowserRouter>
    </BreadcrumbsProvider>
  </Provider>
);

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
