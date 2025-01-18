import React, { useRef } from 'react';
import style from './SignIn.module.scss';
// import { useState } from 'react';
import { singIn } from '../../redux/actions/actionUsers';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';
const SingIp = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAutorize = useSelector((state) => {
    const { users } = state.rootReducer;
    console.log(users);
    return users.isAutorize;
  });

  const error = useSelector((state) => {
    const { users } = state.rootReducer;
    console.log(users);
    return users.errors;
  });

  console.log(error);

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

  function onSubmit(data) {
    console.log(data);
    dispatch(singIn(data));
    if (error) {
      message.error('Ошибка, такого пользователя несуществует!');
    }
  }

  if (isAutorize) {
    return navigate('/');
  }

  ///Переделываем на hook form!!!! и используем туже самую логику с редиректом, хоть в консоле ошибка осталась, пока не понял как ее убрать, видимо не так редирект все равно делаем
  return (
    <div className={style.container}>
      <div className={style.singIp}>
        <h3>Sing In</h3>
        <div className={style.singIp__input}>
          <form className={style.singIp__inputUsername} onSubmit={handleSubmit(onSubmit)}>
            <label>
              <span>Email adress</span>
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

            <label>
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

            <button type="submit" className={style.create}>
              Login
            </button>
          </form>
        </div>
        <div className={style.createAcc}>
          <span className={style.already}>Don't have an account?</span>
          <Link className={style.singIn} to={`/sign-up`}>
            Sing Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingIp;
