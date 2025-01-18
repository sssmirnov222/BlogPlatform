import {
  CREATE_ARTICL,
  DELETE_ARTICL,
  EDIT_ARTICL,
  LIKE_ARTICL,
  DISLIKE_ARTICL,
  GET_ARTICLES,
  GET_ARTICL,
} from '../types';
import { createPost, deletePost, editPost, likePost, dislikePost, fetchGetPostSlug } from '../../services/services';

export const createArticl = (data, token) => async (dispatch) => {
  const response = await createPost(data, token);
  console.log(response);

  try {
    return dispatch({
      type: CREATE_ARTICL,
      title: response.article.title,
      description: response.article.description,
      body: response.article.body,
      url: response.url,
    });
  } catch (error) {
    console.log('Create Articl', error);
  }
};

export const getArticles = (payload) => async (dispatch) => {
  console.log(payload);
  return dispatch({
    type: GET_ARTICLES,
    payload: payload,
  });
};

export const getArticlSlug = (slug) => async (dispatch) => {
  const response = await fetchGetPostSlug(slug);
  console.log(response);
  return dispatch({
    type: GET_ARTICL,
    slug: response.slug,
    response: response,
  });
};

export const deleteArticl = (slug, token) => async (dispatch) => {
  const response = await deletePost(slug, token);
  console.log(response);
  try {
    return dispatch({
      type: DELETE_ARTICL,
      url: response.url,
    });
  } catch (error) {
    console.log('Error delete articl', error);
  }
};

export const editArticl = (value, slug, token) => async (dispatch) => {
  const response = await editPost(value, slug, token);
  console.log(response);
  try {
    return dispatch({
      type: EDIT_ARTICL,
      url: response.url,
      title: response.article.slug === slug ? response.article.title : '',
      body: response.article.slug === slug ? response.article.body : '',
      description: response.article.slug === slug ? response.article.description : '',
    });
  } catch (error) {
    console.log('Error edit articl', error);
  }
};

export const likeArticl = (slug, token) => async (dispatch) => {
  const response = await likePost(slug, token);
  console.log(response);
  try {
    return dispatch({
      type: LIKE_ARTICL,
      favorited: response.article.favorited,
      slug: slug,
      url: response.url,
    });
  } catch (error) {
    console.log('Error edit articl', error);
  }
};

export const disLikeArticl = (slug, token) => async (dispatch) => {
  const response = await dislikePost(slug, token);
  console.log(response);
  try {
    return dispatch({
      type: DISLIKE_ARTICL,
      slug: slug,
      url: response.url,
    });
  } catch (error) {
    console.log('Error edit articl', error);
  }
};
