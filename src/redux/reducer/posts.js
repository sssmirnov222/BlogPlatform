import { CREATE_ARTICL, DELETE_ARTICL, EDIT_ARTICL, LIKE_ARTICL, DISLIKE_ARTICL } from '../types';

const initialState = {};

const posts = (state = initialState, { type, slug, url, favorited, title, body, description }) => {
  console.log(title, body, description);
  switch (type) {
    case CREATE_ARTICL:
      return {
        ...state,
        url: url,
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
      return {
        ...state,
        url: url,
        favorited: favorited,
        slug: slug,
        // openedPost: response,
        // posts: state.posts.map((post) => (post.slug === response.slug ? response : post)),
      };

    case DISLIKE_ARTICL:
      return {
        ...state,
        url: url,
        favorited: favorited,
        slug: slug,
        // openedPost: response,
        // posts: state.posts.map((post) => (post.slug === response.slug ? response : post)),
      };

    default:
      return state;
  }
};

export default posts;
