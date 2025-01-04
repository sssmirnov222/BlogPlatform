import React from 'react';
import style from './CreateArticl.module.scss';
import { useForm } from 'react-hook-form';
import { createArticl } from '../../redux/actions/actiosPosts';

const CreateArticl = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });

  return (
    <>
      <div>
        <h3>Create new article</h3>
        <form>
          <label>
            <span>Title</span>
            <input placeholder="Title" />
          </label>

          <label>
            <span>Short description</span>
            <input placeholder="Title" />
          </label>

          <label>
            <span>Text</span>
            <input placeholder="Text" />
          </label>

          <div>
            <label>
              <span></span>
              <input />
              <button>Delete</button>
            </label>
            <button>Add Tag</button>
          </div>

          <button>Send</button>
        </form>
      </div>
    </>
  );
};

export default CreateArticl;
