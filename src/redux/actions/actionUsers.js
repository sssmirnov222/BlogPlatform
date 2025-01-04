import { SING_IN_USER, SING_UP_USER, SING_LOGOUT_USER } from '../types';
import { singInUser, singUpUser, editProfile } from '../../services/services';

export const singUp = (value) => async (dispatch) => {
  const response = await singUpUser(value);
  console.log('response', response);
  try {
    if (response.user) {
      return dispatch({
        type: SING_UP_USER,
        ...response.user,
      });
    }
    //если не response.user, то нужна логика для отображения ошибки
    // например в стор добавить ошибку, которая null, если ошибка писать туда текст и выводить этот текст под тем input, который не верный
    // это когда имя уже занято или email например
  } catch (error) {
    console.log('SingUp', error);
  }
};

//async используется для асинхронных вызовов, тут он не нужен, ты просто стор меняешь
export const singOut = (dispatch) => {
  localStorage.removeItem('user');
  return dispatch({
    type: SING_LOGOUT_USER,
  });
};

export const singIn = (value) => async (dispatch) => {
  const response = await singInUser(value);
  console.log(response);
  try {
    if (response.user) {
      return dispatch({
        type: SING_IN_USER,
        ...response.user,
      });
    }
  } catch (error) {
    console.log('SingIn', error);
  }
};
