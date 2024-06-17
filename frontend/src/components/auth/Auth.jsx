'use client';
import { useState } from 'react';

import { Login } from '@/components/auth/Login';
import { Register } from '@/components/auth/Register';

import styles from './Auth.module.scss';

const Auth = () => {
  const [authType, setAuthType] = useState('login');

  return (
    <div className={styles.auth}>
      <div className={styles.auth_toggle}>
        <p
          className={authType == 'login' ? styles.active : ''}
          onClick={() => setAuthType('login')}>
          Вход
        </p>
        <p className={authType == 'reg' ? styles.active : ''} onClick={() => setAuthType('reg')}>
          Регистрация
        </p>
      </div>
      {authType == 'login' ? <Login /> : <Register />}
    </div>
  );
};

export default Auth;
