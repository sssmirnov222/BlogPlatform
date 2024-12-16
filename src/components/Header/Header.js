import React from 'react';
import header from './Header.module.scss';

const Header = () => {
  return (
    <>
      <header className={header.header}>
        <h2 className={header.header__blog}>Realworld Blog</h2>
        <div>
          <button className={header.header__singIn}>Sing In</button>
          <button className={header.header__singUp}>Sing Up</button>
        </div>
      </header>
    </>
  );
};

export default Header;
