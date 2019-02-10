import { combineReducers } from 'redux';

import users from 'store/users/reducer';

const reducer = combineReducers({
  users
});

export default reducer;
