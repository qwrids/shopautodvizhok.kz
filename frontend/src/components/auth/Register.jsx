'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

import { authService } from '@/services/authService';

import styles from './Auth.module.scss';
import { useStore } from '../layout/LayoutClient';
import useAuthStore from '@/store';

export const Register = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');

  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfError, setPasswordConfError] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState('');

  const router = useRouter();

  const { signUp } = useAuthStore();

  const { mutate: register, isPending } = useMutation({
    mutationKey: ['register'],
    mutationFn: () =>
      signUp(login, email, password, passwordConf).then(() => {
        router.refresh();
      }),
    onSuccess() {
      toast.success('Добро пожаловать!');
    },
    onError({ response: { data } }) {
      setError(data);
    },
  });

  useEffect(() => {
    if (error) {
      error.email && setEmailError(error.email[0]);
      error.password && setPasswordError(error.password[0]);
      error.username && setLoginError(error.username[0]);
      error.password2 && setPasswordConfError(error.password2[0]);
    }
  }, [error]);

  const onSubmit = (e) => {
    e.preventDefault();
    register();
  };

  return (
    <form onSubmit={onSubmit} className={styles.root}>
      <label>Логин</label>
      {loginError && <p className="text-red-400 text-sm mb-1">{loginError}</p>}
      <input
        type="text"
        placeholder="Введите логин"
        value={login}
        onChange={(e) => {
          setLogin(e.target.value);
          setLoginError('');
        }}
      />
      <label>Почта</label>
      {emailError && <p className="text-red-400 text-sm mb-1">{emailError}</p>}
      <input
        type="email"
        placeholder="Введите почту"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError('');
        }}
      />
      <label>Пароль</label>
      {passwordError && <p className="text-red-400 text-sm mb-1">{passwordError}</p>}
      <div className="flex items-center">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError('');
          }}
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>
      <label>Подтвердите пароль</label>
      {passwordConfError && <p className="text-red-400 text-sm mb-1">{passwordConfError}</p>}
      <div className="flex items-center">
        <input
          type={showPassword ? 'text' : 'password'}
          placeholder="Введите пароль"
          value={passwordConf}
          onChange={(e) => {
            setPasswordConf(e.target.value);
            setPasswordConfError('');
          }}
        />
        <span onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>

      <button className={styles.submit} type="submit" disabled={isPending}>
        Зарегистрироваться
      </button>
    </form>
  );
};
