import React, { Fragment, useState } from 'react';
import style from './CreateArticl.module.scss';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { createArticl } from '../../redux/actions/actiosPosts';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const CreateArticl = () => {
  const [tag, setTag] = useState('');

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
    name: 'tagList',
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
    return users.token;
  });

  const isAutorize = useSelector((state) => {
    const { users } = state.rootReducer;
    return users.isAutorize;
  });

  function onSubmit(data) {
    navigate('/');
    message.success('Пост успешно создан');
    dispatch(createArticl(data, token));
  }
  if (!isAutorize) {
    navigate('/');
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
              placeholder="Short description"
              {...register('description', {
                required: 'Short description enter',
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
              {fields.map((item, index) => (
                <div key={item.id} className={style.Tag}>
                  <Fragment key={item.id}>
                    <Controller
                      render={({ field }) => (
                        <input className={style.tagsArr} placeholder="Tag" defaultValue={field.value} />
                      )}
                      name={`tagList[${index}]`}
                      control={control}
                    />
                    <button type="button" className={style.deleteTag} onClick={removeTag(index)}>
                      Delete
                    </button>

                    <br />
                  </Fragment>
                </div>
              ))}

              <div className={style.startTag}>
                <input
                  onChange={onChangeTag}
                  placeholder="Tag"
                  value={tag}
                  // {...register('tagList', {
                  //   required: 'Tag enter',
                  // })}
                />
                <button type="button" className={style.addTag} onClick={addTag}>
                  Add Tag
                </button>

                {/* <input placeholder="Enter tag..." value={tag} onChange={onChangeTag} />
      <button type="button" onClick={addTag}>
        Add Tag
      </button> */}
              </div>
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
