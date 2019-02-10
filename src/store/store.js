import { applyMiddleware, compose, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';

import reducer from './index';

const history = createBrowserHistory();

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

const logger = createLogger({
  collapsed: true,
});

const middleware = [
  applyMiddleware(routerMiddleware(history)),
  applyMiddleware(logger),
];

const Store = createStore(reducer, composeEnhancers(...middleware));

export default Store;

