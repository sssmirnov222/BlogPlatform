import { SING_IN_USER, SING_UP_USER, SING_LOGOUT_USER } from '../types';

const isUserData = localStorage.getItem('user');
const removeUser = localStorage.removeItem('user');

export const initialState = isUserData
  ? {
      ...JSON.parse(isUserData),
      isAutorize: true,
    }
  : { removeUser, isAutorize: false };

const users = (state = initialState, { type, payload }) => {
  switch (type) {
    case SING_UP_USER:
      return {
        ...state,
        isAutorize: true,
        ...payload,
      };

    case SING_IN_USER:
      return {
        ...state,
      };

    case SING_LOGOUT_USER:
      return {
        ...state,
        isAutorize: false,
      };

    default:
      return {
        state,
      };
  }
};

export default users;
