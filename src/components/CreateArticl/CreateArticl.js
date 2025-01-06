import React, { useState } from 'react';
import style from './CreateArticl.module.scss';
import { useFieldArray, useForm } from 'react-hook-form';
import { createArticl } from '../../redux/actions/actiosPosts';
import { useDispatch, useSelector } from 'react-redux';

const CreateArticl = () => {
  const [tag, setTag] = useState('');

  const dispatch = useDispatch();

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

  console.log(token);

  function onSubmit(data) {
    console.log(data, 'bbb', token);
    dispatch(createArticl(data, token));
  }

  return (
    <>
      <div>
        <h3>Create new article</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            <span>Title</span>
            <input
              type="text"
              placeholder="Title"
              {...register('title', {
                required: 'Title enter',
              })}
            />
          </label>
          {errors?.title?.message && <p>{errors?.title?.message || 'Error'}</p>}

          <label>
            <span>Short description</span>
            <input
              type="text"
              placeholder="Title"
              {...register('description', {
                required: 'Title enter',
              })}
            />
          </label>
          {errors?.description?.message && <p>{errors?.description?.message || 'Error'}</p>}

          <label>
            <span>Text</span>
            <input
              placeholder="text"
              {...register('body', {
                required: 'Text enter',
              })}
            />
          </label>
          {errors?.text?.message && <p>{errors?.text?.message || 'Error'}</p>}

          <label>
            <span></span>
            <input
              onChange={onChangeTag}
              placeholder="Tag"
              {...register('tagList', {
                required: 'Tag enter',
              })}
            />
            <button onClick={removeTag()}>Delete</button>
          </label>
          {errors?.tags?.message && <p>{errors?.tags?.message || 'Error'}</p>}
          <button onClick={addTag}>Add Tag</button>

          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
};

export default CreateArticl;
