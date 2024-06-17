import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { authService } from '@/services/authService';

const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      signIn: async (username, password) => {
        await authService.login(username, password).then((res) => {
          set({ isLoggedIn: true });
          localStorage.setItem('accessToken', res.data.access);
          const userLocalStorage = localStorage.getItem('accessToken');
          if (userLocalStorage) {
            set({ isLoggedIn: true });
          }
        });
      },
      signUp: async (username, email, password, passwordConf) => {
        await authService.registration(username, email, password, passwordConf).then((res) => {
          authService.login(username, password).then(() => {
            localStorage.setItem('accessToken', res.data.access);
            const userLocalStorage = localStorage.getItem('accessToken');
            if (userLocalStorage) {
              set({ isLoggedIn: true });
            }
          });
        });
      },
      logout: () => {
        authService.logout().then(() => {
          set({ isLoggedIn: false });
          localStorage.removeItem('accessToken');
        });
      },
    }),
    {
      name: 'userLoginStatus',
    },
  ),
);

export default useAuthStore;
