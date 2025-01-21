import React, { useRef } from 'react';
import style from './SignUp.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { singUp } from '../../redux/actions/actionUsers';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

const SingUp = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const isAutorize = useSelector((state) => {
    const { users } = state.rootReducer;
    return users.isAutorize;
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    mode: 'onBlur',
  });

  const error = useSelector((state) => {
    const { users } = state.rootReducer;
    return users.errors;
  });

  const password = useRef({});
  password.current = watch('password', '');

  function onSubmit(data) {
    dispatch(singUp(data));
    if (error) {
      message.error('Ошибка, такой пользователь уже есть!');
    }
  }

  if (isAutorize) {
    return navigate('/');
  }

  // Добавить отображение ошибок что бы глаза не ломались
  return (
    <div className={style.container}>
      <div className={style.singUp}>
        <h3>Create new account</h3>
        <div className={style.singUp__input}>
          <form className={style.singUp__form} onSubmit={handleSubmit(onSubmit)}>
            <label className={style.singUp__inputUsername}>
              <span>Username</span>
              <input
                type="text"
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

            <label className={style.singUp__inputEmail}>
              <span>Email address</span>
              <input
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

            <label className={style.singUp__inputPassword}>
              <span>Password</span>
              <input
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: 'Please enter your password',
                  minLength: { value: 6, message: 'at least 6 characters' },
                  maxLength: { value: 40, message: 'at least 40 characters' },
                })}
              />
            </label>
            {errors?.password?.message && (
              <p className={style.userPasswordErrors}>{errors?.password?.message || 'Error'}</p>
            )}

            <label className={style.singUp__inputPassword_Repeat}>
              <span>Repeat Password</span>
              <input
                type="password"
                placeholder="Password"
                {...register('repeatPassword', {
                  validate: (value) => value === password.current || 'The password do not match',
                  required: 'Please enter your password',
                  minLength: { value: 6, message: 'at least 6 characters' },
                  maxLength: { value: 40, message: 'at least 40 characters' },
                })}
              />
            </label>
            {errors?.repeatPassword?.message && (
              <p className={style.userRepeatPasswordErrors}>{errors?.repeatPassword?.message || 'Error'}</p>
            )}

            <label className={style.processing}>
              <input
                type="checkbox"
                {...register('checkbox', {
                  required: 'You must checkbox',
                })}
              />
              <span>I agree to the processing of my personal information</span>
            </label>
            {errors?.checkbox?.message && <p className={style.checkbox}>{errors?.checkbox?.message || 'Error'}</p>}

            <button type="submit" className={style.create}>
              Create
            </button>
          </form>
        </div>

        <div className={style.createAcc}>
          <span className={style.already}>Already have an account?</span>
          <Link className={style.singIn} to={`/sign-in`}>
            Sing In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
