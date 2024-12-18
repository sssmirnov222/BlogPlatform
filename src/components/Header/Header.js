import React from 'react';
import header from './Header.module.scss';
import { Routes, Route, Link } from 'react-router-dom';
import SingIp from '../SignIn/SignIn';
import SingUp from '../SingUp/SingUp';

const Header = () => {
  return (
    <>
      <header className={header.header}>
        <h2 className={header.header__blog}>Realworld Blog</h2>
        <div>
          <Link to={`/sign-in`} className={header.header__singIn}>
            Sing In
          </Link>
          <Link to={`/sign-up`} className={header.header__singUp}>
            Sing Up
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
