import Axios from "axios";
import { useParams, useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';

import { Header } from '../../shared/header';
import { Footer } from '../../shared/footer';
import Loading, { HFLoading } from "../../shared/loading";
import CONSTANT from '../../../constant';
import makeConfig from "../../shared/core/config";
import { setRefreshToken, setAccessToken } from "../../shared/core/token";
import styles from './signup.module.css';


export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  
  const passwordValidator = () => {
    const MIN_LENGTH = 8;
    const DIGIT = /\d/;
    const SPCHAR = /[-`~!@#$%^&*()_+=]/;
    const UPPER_CASE_LETTER = /.*[A-Z].*/;
    const isFIRST_CHAR_NOT_DIGIT = (password.indexOf(0) >= '0' && password.indexOf(0) <= '9')
      ? false
      : true;
    
    return (password.length >= MIN_LENGTH &&
      DIGIT.test(password) &&
      SPCHAR.test(password) &&
      UPPER_CASE_LETTER.test(password) &&
      isFIRST_CHAR_NOT_DIGIT)
      ? true
      : false;
  };

  const usernameValidator = () => {
    return (String(password || "").length >= 4)
      ? true
      : false;
  };

  const passwordErrors = () => {
    const MIN_LENGTH = 8;
    const DIGIT = /\d/;
    const SPCHAR = /[-`~!@#$%^&*()_+=]/;
    const UPPER_CASE_LETTER = /.*[A-Z].*/;
    const LOWER_CASE_LETTER = /.*[a-z].*/;
    const isFIRST_CHAR_NOT_DIGIT = (password.charAt(0) >= '0' && password.charAt(0) <= '9')
      ? false
      : true;
    
    const errors = [
      `password minnimum length ${MIN_LENGTH}`,
      `1'st character don't have any digit`,
      `must contains one digit`,
      `must contains one uppercase letter`,
      `must contains one lowercase letter`,
      `must contains one special character [-\`~!@#$%^&*()_+=]`
    ];

    const errorsList = [];
    if (password.length < MIN_LENGTH)       errorsList.push(errors[0]);
    if (!isFIRST_CHAR_NOT_DIGIT)            errorsList.push(errors[1]);
    if (!DIGIT.test(password))              errorsList.push(errors[2]);
    if (!UPPER_CASE_LETTER.test(password))  errorsList.push(errors[3]);
    if (!LOWER_CASE_LETTER.test(password))  errorsList.push(errors[4]);
    if (!SPCHAR.test(password))             errorsList.push(errors[5]);

    return errorsList;
  };

  const isFormValid = () => {
    return (usernameValidator() && passwordValidator())
      ? true
      : false;
  }

  const handleUserLogin = () => {
    const data = {
      'username': username,
      'password': password
    };
    Axios(makeConfig('post', `user/signin`, data))
      .then(res => res.data)
      .then(res => {
        // console.log(res);
        setRefreshToken(res?.refresh);
        setAccessToken(res?.access);

        // redirect to phone page
        history.push('/landing');
      })
      .catch(err => {
        setErrors(err?.response?.data);
      })
  };

  const handleForm = () => {
    if (!isFormValid()) return;

    const data = {
      'username': username,
      'email': email,
      'password': password
    };
    Axios(makeConfig('post', `user/signup`, data))
      .then(res => res.data)
      .then(res => {
        // console.log(res);
        handleUserLogin();
      })
      .catch(err => {
        console.log(err?.response?.data);
        setErrors(err?.response?.data);
      })
  };

  const Errors = () => {
    let count = 1;

    return (errors === null)
    ? null
    : <div className={styles.errorList}>
      {Object.keys(errors).map((errorObjKey, index1) => {
          return Array.isArray(errors[errorObjKey]) ? (
            errors[errorObjKey].map((error, index2) => (
              <p key={`${index1}-${index2}`}>{`${count++}) ${error}`}</p>
            ))
          ) : (
            <p key={`${index1}-${count}`}>{`${count++}) ${
              errors[errorObjKey]
            }`}</p>
          );
        })}
    </div>
  }

  return (loading)
    ? <HFLoading />
    : <>
      <Header />
      <div className={styles.container}>
        <div className={styles.heading}>Sign up</div>
        <Errors />
        <div className={styles.formItems}>
          <div>Username</div>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={styles.username}
            placeholder="enter username"
            />
          
          <div>Email</div>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.email}
            placeholder="enter email"
            />

          <div>Password</div>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.password}
            placeholder="enter password"
            />
          {!passwordValidator() && 
            <div className={styles.passwordErrorList}>
              {passwordErrors().map((error, index) => (
                <div className={styles.errorItem} key={index}>{`${index+1}) ${error}`}</div>
              ))}
            </div>
          }

            <button
              onClick={handleForm}
              disabled={!isFormValid()}
              className={isFormValid()
              ? `${styles.loginBtn} ${styles.loginBtnActive}`
              : `${styles.loginBtn}`}>Sign up</button>

            <div className={styles.signup}>Don’t have an account? <span className={styles.signupBtn} onClick={() => history.push('/signup') }>Sign up</span></div>
        </div>
      </div>
      <Footer />
    </>
}
