import React from 'react';
import singIp from './SignIn.module.scss';
import { useState, useEffect } from 'react';
import { singInUser } from '../../services/services';
import { Link } from 'react-router-dom';
const SingIp = () => {
  let name = JSON.parse(localStorage.getItem('user'));
  console.log(name.username);
  console.log(name.email);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    singInUser(email, password);
  }, []);

  return (
    <div className={singIp.container}>
      <div className={singIp.singIp}>
        <h3>Sing In</h3>
        <div className={singIp.singIp__input}>
          <form className={singIp.singIp__inputUsername}>
            <label>
              <span>Email adress</span>
              <input placeholder="Email adress" onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label>
              <span>Password</span>
              <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </label>
          </form>
        </div>

        {email === name.email ? (
          <Link to={`/`}>
            <button className={singIp.create} onClick={() => singInUser({ email, password })}>
              Login
            </button>
          </Link>
        ) : (
          <button className={singIp.create} onClick={() => singInUser({ email, password })}>
            Login
          </button>
        )}

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
