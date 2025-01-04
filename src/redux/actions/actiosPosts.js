import { CREATE_ARTICL } from '../types';
import { createPost } from '../../services/services';

export const createArticl = (value) => async (dispatch) => {
  const response = await createPost(value);
  console.log(response);
  try {
  } catch (error) {
    console.log('Create Articl', error);
  }
};
