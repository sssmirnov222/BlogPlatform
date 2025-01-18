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
  openedPost: null,
};

const posts = (state = initialState, { type, slug, url, title, body, description, payload, response }) => {
  // console.log(slug);
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
        body: body,
        description: description,
      };

    case LIKE_ARTICL:
      // console.log(state.post, slug);
      return {
        ...state,
        url: url,
        openedPost: response,
        post: state.post.map((post) => (post.slug === slug ? payload : post)),
      };

    case DISLIKE_ARTICL:
      return {
        ...state,
        url: url,
        openedPost: response,
        slug: slug,
        post: state.post.map((post) => (post.slug === slug ? payload : post)),
      };

    default:
      return state;
  }
};

export default posts;
