import { SING_IN_USER, SING_UP_USER, SING_LOGOUT_USER, EDIT_USER, SING_ERR_USER } from '../types';

const isUserData = localStorage.getItem('user');

export const initialState = isUserData
  ? {
      ...JSON.parse(isUserData),
      isAutorize: true,
    }
  : { isAutorize: false };

const users = (state = initialState, { type, payload, token, username, image, errors, response, url }) => {
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
        username: response.username,
        isAutorize: true,
      };

    case SING_ERR_USER:
      return {
        errors: errors,
      };

    case SING_LOGOUT_USER:
      // console.log('тут');
      return {
        isAutorize: false,
      };

    case EDIT_USER:
      return {
        ...state,
        isAutorize: true,
        image: image,
        url: url,
        username: undefined ? '' : response.username,
        email: undefined ? '' : response.email,
      };

    default:
      return state;
  }
};

export default users;
