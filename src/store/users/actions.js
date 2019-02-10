import Firestore from 'services/Firestore'
import FirestoreProvider from 'providers/FirestoreProvider';
import * as ActionTypes from './actionTypes';
import Store from 'store/store';

const { collections: { USERS } } = FirestoreProvider;
export const getUsers = users => ({
  type: ActionTypes.GET_USERS,
  users,
});

/**
 * @returns {Promise<void>}
 */
export const getUsersRequest = async () => {
  try {
    const usersData = await Firestore.Instance.getCollection(USERS);
    Store.dispatch(getUsers(usersData));
  } catch (err) {
    const { response: { data: { message = null } = {} } = {} } = err;
    console.error(message || err);
  }
};

export const removeUser = id => ({
  type: ActionTypes.REMOVE_USER,
  id,
});

/**
 * @param id {string}
 * @returns {Promise<void>}
 */
export const removeUserRequest = async (id) => {
  try {
    await Firestore.Instance.deleteDoc(USERS, id);
    Store.dispatch(removeUser(id));
  } catch (err) {
    const { response: { data: { message = null } = {} } = {} } = err;
    console.error(message || err);
  }
};

export const editUser = user => ({
  type: ActionTypes.EDIT_USER,
  user,
});

/**
 * @param data {id, email, name}
 * @returns {Promise<void>}
 */
export const editUserRequest = async (data) => {
  try {
    await Firestore.Instance.editDoc(USERS, data.id, data);
    Store.dispatch(editUser(data));
  } catch (err) {
    const { response: { data: { message = null } = {} } = {} } = err;
    console.error(message || err);
  }
};

export const addUser = user => ({
  type: ActionTypes.ADD_USER,
  user,
});

/**
 * @param data {email, name}
 * @returns {Promise<void>}
 */
export const addUserRequest = async (data) => {
  try {
    const id = await Firestore.Instance.addDoc(USERS, data);
    Store.dispatch(addUser({ id, ...data }));
  } catch (err) {
    const { response: { data: { message = null } = {} } = {} } = err;
    console.error(message || err);
  }
};

export const setCurrentUser = user => ({
  type: ActionTypes.SET_CURRENT,
  user,
});

/**
 * @param id {string}
 * @returns {Promise<void>}
 */
export const searchUserByIdRequest = async (id) => {
  try {
    const user = await Firestore.Instance.getDoc(USERS, id);
    Store.dispatch(setCurrentUser(user));
  } catch (err) {
    const { response: { data: { message = null } = {} } = {} } = err;
    console.error(message || err);
  }
};

export const clearCurrentUser = () => {
  Store.dispatch(setCurrentUser({}));
};
