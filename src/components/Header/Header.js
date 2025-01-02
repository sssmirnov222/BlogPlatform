import React from 'react';
import header from './Header.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { singOut } from '../../redux/actions/actionUsers';

const Header = () => {
  const dispatch = useDispatch();
  const isAutorize = useSelector((state) => {
    const { users } = state.rootReducer;
    return users.state.isAutorize;
  });

  return (
    <>
      <header className={header.header}>
        <h2 className={header.header__blog}>Realworld Blog</h2>

        {isAutorize ? (
          <div>
            <button>Create Article</button>
            <button onClick={dispatch(singOut)}>Log Out</button>
          </div>
        ) : (
          <div>
            <Link to={`/sign-in`} className={header.header__singIn}>
              Sing In
            </Link>
            <Link to={`/sign-up`} className={header.header__singUp}>
              Sing Up
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
