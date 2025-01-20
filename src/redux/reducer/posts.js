import {
  CREATE_ARTICL,
  DELETE_ARTICL,
  EDIT_ARTICL,
  LIKE_ARTICL,
  DISLIKE_ARTICL,
  GET_ARTICLES,
  GET_ARTICL,
} from '../types';

export const initialState = {
  post: [],
  openedPost: {},
};

const posts = (state = initialState, { type, slug, url, title, body, description, payload, response }) => {
  switch (type) {
    case CREATE_ARTICL:
      return {
        ...state,
        url: url,
      };

    case GET_ARTICLES:
      return {
        ...state,
        post: payload,
      };

    case GET_ARTICL:
      return {
        ...state,
        openedPost: response,
      };

    case DELETE_ARTICL:
      return {
        ...state,
        url: url,
      };

    case EDIT_ARTICL:
      return {
        ...state,
        url: url,
        title: title,
        slug: slug,
        body: body,
        description: description,
      };

    case LIKE_ARTICL:
      return {
        ...state,
        url: url,
        openedPost: response,
        post: state.post.map((post) => (post.slug === slug ? response : post)),
      };

    case DISLIKE_ARTICL:
      return {
        ...state,
        url: url,
        openedPost: response,
        slug: slug,
        post: state.post.map((post) => (post.slug === slug ? response : post)),
      };

    default:
      return state;
  }
};

export default posts;
