import React, { useState } from 'react';
import style from './CreateArticl.module.scss';
import { useFieldArray, useForm } from 'react-hook-form';
import { createArticl } from '../../redux/actions/actiosPosts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const CreateArticl = () => {
  const [tag, setTag] = useState('');
  const [submit, setSubmit] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const addTag = () => {
    append(tag);
    setTag('');
  };

  const removeTag = (index) => () => {
    remove(index);
  };

  const onChangeTag = (event) => {
    setTag(event.target.value);
  };

  const token = useSelector((state) => {
    const { users } = state.rootReducer;
    console.log(users);
    return users.token;
  });

  const url = useSelector((state) => {
    const { posts } = state.rootReducer;
    return posts.url;
  });

  console.log(url);

  function onSubmit(data) {
    setSubmit(true);
    dispatch(createArticl(data, token));
    if (url) {
      message.success('Пост успешно создан');
    }
  }

  return (
    <>
      <div className={style.form}>
        <h3 className={style.formCreteArticl}>Create new article</h3>
        <form onSubmit={handleSubmit(onSubmit)} className={style.formArticl}>
          <label className={style.formArticlTitle}>
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

          <label className={style.formArticlDescription}>
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

          <label className={style.formArticlBody}>
            <span>Text</span>
            <input
              placeholder="text"
              {...register('body', {
                required: 'Text enter',
              })}
            />
          </label>
          {errors?.text?.message && <p>{errors?.text?.message || 'Error'}</p>}

          <label className={style.formArticlTag}>
            <span>Tags</span>
            <div className={style.formArticlTagInput}>
              <input
                onChange={onChangeTag}
                placeholder="Tag"
                {...register('tagList', {
                  required: 'Tag enter',
                })}
              />
              <button className={style.deleteTag} onClick={removeTag()}>
                Delete
              </button>
              <button className={style.addTag} onClick={addTag}>
                Add Tag
              </button>
            </div>
          </label>
          {errors?.tags?.message && <p>{errors?.tags?.message || 'Error'}</p>}

          <button type="submit" className={style.send}>
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateArticl;
