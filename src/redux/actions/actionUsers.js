import { SING_IN_USER, SING_UP_USER, SING_LOGOUT_USER } from '../types';
import { singInUser, singUpUser, editProfile } from '../../services/services';

export const singUp = (value) => async (dispatch) => {
  const response = await singUpUser(value);
  console.log('response', response);
  try {
    if (response.user) {
      dispatch({
        type: SING_UP_USER,
        ...response.user,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export const singOut = (value) => async (dispatch) => {
  try {
    dispatch({
      type: SING_LOGOUT_USER,
    });
  } catch (e) {
    console.log(e);
  }
};
