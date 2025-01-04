import { CREATE_ARTICL } from '../types';

const initialState = {};

const posts = (state = initialState, { type }) => {
  switch (type) {
    case CREATE_ARTICL:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default posts;
