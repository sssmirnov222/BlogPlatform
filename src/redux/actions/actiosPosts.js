import { CREATE_ARTICL } from '../types';
import { createPost } from '../../services/services';

export const createArticl = (data, token) => async (dispatch) => {
  console.log(data);
  console.log(token);
  const response = await createPost(data, token);
  console.log(response);
  try {
    return dispatch({
      type: CREATE_ARTICL,
      ...response,
    });
  } catch (error) {
    console.log('Create Articl', error);
  }
};
