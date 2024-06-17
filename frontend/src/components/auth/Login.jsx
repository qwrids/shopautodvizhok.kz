'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';

import { authService } from '@/services/authService';

import styles from './Auth.module.scss';
import useAuthStore from '@/store';

export const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [error, setError] = useState();

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { signIn } = useAuthStore();

  const { mutate: auth, isPending } = useMutation({
    mutationKey: ['auth'],
    mutationFn: () => signIn(login, password),
    onSuccess() {
      router.refresh();
      toast.success('Добро пожаловать!');
    },
    onError({ response: { data } }) {
      console.log(data);
      !data.detail ? setError(data) : toast.error(data.detail);
    },
  });

  useEffect(() => {
    if (error) {
      error.password && setPasswordError(error.password[0]);
      error.username && setLoginError(error.username[0]);
    }
  }, [error]);

  const onSubmit = (e) => {
    e.preventDefault();
    auth();
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
      <button className={styles.submit} type="submit" disabled={isPending}>
        Войти
      </button>
    </form>
  );
};
