import React from 'react';
import singUp from './SignUp.module.scss';
import SingIp from '../SignIn/SignIn';
import { Link } from 'react-router-dom';
const SingUp = () => {
  return (
    <div className={singUp.container}>
      <div className={singUp.singUp}>
        <h3>Create new account</h3>
        <div className={singUp.singUp__input}>
          <form className={singUp.singUp__inputUsername}>
            <label>Username</label>
            <input placeholder="Username" />
          </form>

          <form className={singUp.singUp__inputEmail}>
            <label>Email address</label>
            <input placeholder="Email adress" />
          </form>

          <form className={singUp.singUp__inputPassword}>
            <label>Password</label>
            <input placeholder="Password" />
          </form>

          <form className={singUp.singUp__inputPassword_Repeat}>
            <label>Repeat Password</label>
            <input placeholder="Password" />
          </form>
        </div>
        <div className={singUp.processing}>
          <input type="checkbox" />
          <span>I agree to the processing of my personal information</span>
        </div>
        <button className={singUp.create}>Create</button>
        <div className={singUp.createAcc}>
          <span className={singUp.already}>Already have an account?</span>
          <Link className={singUp.singIn} to={`/sign-in`}>
            Sing In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
