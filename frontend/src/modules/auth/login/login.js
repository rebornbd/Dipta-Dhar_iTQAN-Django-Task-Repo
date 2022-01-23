import Axios from "axios";
import { useParams, useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';

import { Header } from '../../shared/header';
import { Footer } from '../../shared/footer';
import Loading, { HFLoading } from "../../shared/loading";
import makeConfig, { axiosConfig } from "../../shared/core/config";
import { setRefreshToken, setAccessToken, getAccessToken, setUserData } from "../../shared/core/token";
import styles from './login.module.css';


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  
  const isFormValid = () => {
    if (String(username).length >= 4 && String(password).length >= 5)
      return true;
    return false;
  }

  const handleForm = () => {
    if (!isFormValid()) return;

    const data = {
      'username': username,
      'password': password
    };
    Axios(makeConfig('post', `user/signin`, data))
      .then(res => res.data)
      .then(res => {
        // console.clear();
        // console.log(res);

        setRefreshToken(res?.refresh);
        setAccessToken(res?.access);
        userRouteHandler();
        // history.push("/landing");
      })
      .catch(err => {
        setErrors(err?.response?.data);
      })
  };

  const userRouteHandler = () => {
    Axios(axiosConfig('get', "user/details/"))
      .then(res => res?.data)
      .then(res => {
        const user = res;
        setUserData(JSON.stringify(user));

        if (user?.is_superuser) history.push("/admin");
        else history.push("/landing");
      })
      .catch(err => {

      });
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

  const HelpGuide = () => {
    return (
      <div className={styles.helpGuide}>
        <div className={styles.helpGuideRow}>
          <div className={styles.helpGuideTitle}>ADMIN USER</div>
          <div>username: admin</div>
          <div>password: admin</div>
        </div>
        <div className={styles.helpGuideRow}>
          <div className={styles.helpGuideTitle}>GENERAL USER</div>
          <div>username: user</div>
          <div>password: Q1w2e3r4!</div>
        </div>
      </div>
    )
  }

  return (loading)
    ? <HFLoading />
    : <>
      <Header />
      <div className={styles.container}>
        <div className={styles.heading}>Login</div>
        <HelpGuide />
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
          
          <div>Password</div>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.password}
            placeholder="enter password"
            />

            <button
              onClick={handleForm}
              disabled={!isFormValid()}
              className={isFormValid()
              ? `${styles.loginBtn} ${styles.loginBtnActive}`
              : `${styles.loginBtn}`}>Login</button>

            <div className={styles.signup}>Don’t have an account? <span className={styles.signupBtn} onClick={() => history.push('/signup') }>Sign up</span></div>
        </div>
      </div>
      <Footer />
    </>
}
