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

  const username = useSelector((state) => {
    const { users } = state.rootReducer;
    console.log(users);
    return users.username;
  });

  const image = useSelector((state) => {
    const { users } = state.rootReducer;
    console.log(users);
    return users.image;
  });

  return (
    <>
      <header className={header.header}>
        <NavLink to={'/'} className={header.header__blog}>
          Realworld Blog
        </NavLink>
        {/* соотвтетственно если есть залогинен, то нужно выводить имя и аватар*/}
        {isAutorize && (
          <div className={header.header__users}>
            <NavLink to={'/new-article'} className={header.header__createArticl} end>
              Create Article
            </NavLink>
            <NavLink to={'/profile'} className={header.header__users_info}>
              <span>{username}</span>
              <img
                className={header.header__users_infoImage}
                src={
                  image === undefined || null || image.slice(0, 4) !== 'http'
                    ? 'https://static.productionready.io/images/smiley-cyrus.jpg'
                    : image
                }
                alt="none"
              />
            </NavLink>
            <button type="button" className={header.header__LogOut} onClick={() => dispatch(singOut)}>
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
