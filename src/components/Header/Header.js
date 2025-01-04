import React from 'react';
import header from './Header.module.scss';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { singOut } from '../../redux/actions/actionUsers';

const Header = () => {
  const dispatch = useDispatch();
  const isAutorize = useSelector((state) => {
    const { users } = state.rootReducer;

    return users.isAutorize;
  });

  return (
    <>
      <header className={header.header}>
        <NavLink to={'/'} className={header.header__blog}>
          Realworld Blog
        </NavLink>
        {/* соотвтетственно если есть залогинен, то нужно выводить имя и аватар*/}
        {isAutorize && (
          <div>
            <NavLink to={'/new-article'} end>
              Create Article
            </NavLink>
            <button type="button" onClick={() => dispatch(singOut)}>
              Log Out
            </button>
          </div>
        )}
        {/* поправить на https://reactrouter.com/7.1.1/start/framework/navigating */}
        {!isAutorize && (
          <div>
            <NavLink to={`/sign-in`} className={header.header__singIn} end>
              Sing In
            </NavLink>
            <NavLink to={`/sign-up`} className={header.header__singUp} end>
              Sing Up
            </NavLink>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
