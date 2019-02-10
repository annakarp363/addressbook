import * as ActionTypes from './actionTypes';

function users(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_USERS:
      return {
        ...state,
        list: action.users,
      };
    case ActionTypes.REMOVE_USER:
      return {
        ...state,
        list: [ ...state.list.filter(user => user.id !== action.id) ],
        current: Object.assign({}, state.current, { handled: true }),
      };
    case ActionTypes.EDIT_USER:
      return {
        ...state,
        list: state.list.map(user => user.id === action.user.id
          ? action.user
          : user
        ),
        current: Object.assign({}, state.current, { handled: true }),
      };
    case ActionTypes.ADD_USER:
      return {
        ...state,
        list: [ ...state.list, action.user ],
        current: Object.assign({}, action.user, { handled: true }),
      };
    case ActionTypes.SET_CURRENT:
      return {
        ...state,
        current: Object.assign({}, action.user),
      };
    default:
      return state;
  }
}

export default users;
