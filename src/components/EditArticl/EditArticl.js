import React, { useState } from 'react';
import style from './EditArticl.module.scss';
import { useForm } from 'react-hook-form';
import { editArticl } from '../../redux/actions/actiosPosts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { message } from 'antd';

const EditArticl = () => {
  const { slug } = useParams();
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const token = useSelector((state) => {
    const { users } = state.rootReducer;
    return users.token;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  function onSubmit(data) {
    dispatch(editArticl(data, slug, token));
    message.success('Пост успешно изменён');
    navigate('/');
  }

  return (
    <>
      <div className={style.edit}>
        <h3 className={style.editCreteArticl}>Edit article</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={style.editArticl}>
          <label className={style.editArticlTitle}>
            <span>Title</span>
            <input
              type="text"
              placeholder="Title"
              {...register('title', {
                required: 'Title enter',
              })}
            />
          </label>
          {errors?.title?.message && <p className={style.userTitleErrors}>{errors?.title?.message || 'Error'}</p>}

          <label className={style.editArticlDescription}>
            <span>Short description</span>
            <input
              type="text"
              placeholder="Title"
              {...register('description', {
                required: 'Title enter',
              })}
            />
          </label>
          {errors?.description?.message && (
            <p className={style.userTitleErrors}>{errors?.description?.message || 'Error'}</p>
          )}

          <label className={style.editArticlBody}>
            <span>Text</span>
            <input
              placeholder="text"
              {...register('body', {
                required: 'Text enter',
              })}
            />
          </label>
          {errors?.text?.message && <p className={style.userTitleErrors}>{errors?.text?.message || 'Error'}</p>}

          <button type="submit" className={style.send}>
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default EditArticl;
