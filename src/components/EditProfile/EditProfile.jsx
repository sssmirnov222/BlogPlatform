import React, { useRef } from 'react';
import style from './EditProfile.module.scss';
import { useForm } from 'react-hook-form';
import { editUser } from '../../redux/actions/actionUsers';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => {
    const { users } = state.rootReducer;
    return users.token;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const password = useRef({});
  password.current = watch('password', '');

  const isAutorize = useSelector((state) => {
    const { users } = state.rootReducer;
    return users.isAutorize;
  });

  const username = useSelector((state) => {
    const { users } = state.rootReducer;
    return users.username;
  });

  const email = useSelector((state) => {
    const { users } = state.rootReducer;
    return users.email;
  });

  function onSubmit(data) {
    dispatch(editUser(data, token));
    if (isAutorize) {
      navigate('/');
    }
  }

  if (!isAutorize) {
    navigate('/');
  }

  return (
    <div className={style.container}>
      <div className={style.singUpEdit}>
        <h3>Edit account</h3>
        <div className={style.singUpEdit__input}>
          <form className={style.singUpEdit__form} onSubmit={handleSubmit(onSubmit)}>
            <label className={style.singUpEdit__inputUsername}>
              <span>Username</span>
              <input
                type="text"
                defaultValue={username}
                placeholder="Username"
                {...register('username', {
                  required: 'Please enter your username',
                  minLength: { value: 6, message: 'at least 6 characters' },
                  maxLength: { value: 24, message: 'at least 24 characters' },
                })}
              />
            </label>
            {errors?.username?.message && (
              <p className={style.userClassErrors}>{errors?.username?.message || 'Error'}</p>
            )}

            <label className={style.singUpEdit__inputEmail}>
              <span>Email address</span>
              <input
                defaultValue={email}
                type="email"
                placeholder="Email adress"
                {...register('email', {
                  required: 'Please enter your email',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter valid email',
                  },
                })}
              />
            </label>
            {errors?.email?.message && <p className={style.userEmailErrors}>{errors?.email?.message || 'Error'}</p>}

            <label className={style.singUpEdit__inputPassword}>
              <span>Biografia</span>
              <input type="text" placeholder="Biografia" />
            </label>
            {errors?.bio?.message && <p className={style.userPasswordErrors}>{errors?.bio?.message || 'Error'}</p>}

            <label className={style.singUpEdit__inputPassword_Repeat}>
              <span>Image</span>
              <input type="text" placeholder="image" />
            </label>
            {errors?.image?.message && <p className={style.image}>{errors?.image?.message || 'Error'}</p>}

            <button type="submit" className={style.edit}>
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

