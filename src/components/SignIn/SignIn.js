import React from 'react';
import singIp from './SignIn.module.scss';
import { Link } from 'react-router-dom';
const SingIp = () => {
  return (
    <div className={singIp.container}>
      <div className={singIp.singIp}>
        <h3>Sing In</h3>
        <div className={singIp.singIp__input}>
          <form className={singIp.singIp__inputUsername}>
            <label>Email adress</label>
            <input placeholder="Email adress" />
          </form>

          <form className={singIp.singIp__inputEmail}>
            <label>Password</label>
            <input placeholder="Password" />
          </form>
        </div>

        <button className={singIp.create}>Login</button>
        <div className={singIp.createAcc}>
          <span className={singIp.already}>Don't have an account?</span>
          <Link className={singIp.singIn} to={`/sign-up`}>
            Sing Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingIp;
