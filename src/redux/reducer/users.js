import { SING_IN_USER, SING_UP_USER, SING_LOGOUT_USER } from '../types';

const isUserData = localStorage.getItem('user');
// const removeUser = localStorage.removeItem('user');

export const initialState = isUserData
  ? {
      ...JSON.parse(isUserData),
      isAutorize: true,
    }
  : { isAutorize: false };

const users = (state = initialState, { type, payload, token, username }) => {
  console.log(username);
  switch (type) {
    case SING_UP_USER:
      return {
        ...state,
        isAutorize: true,
        token: token,
        username: username,
        ...payload,
      };

    case SING_IN_USER:
      return {
        ...state,
        token: token,
        username: username,
        isAutorize: true,
      };

    case SING_LOGOUT_USER:
      console.log('тут');
      return {
        isAutorize: false,
      };

    default:
      return state;
  }
};

export default users;
