import { axiosUnauth, API_URL, axiosWithAuth } from '@/api/interceptors';

import { removeFromStorage, saveTokenStorage } from './auth-token.service';
export const authService = {
  async login(username, password) {
    const response = await axiosUnauth.post('/api/token/', { username, password });

    if (response.data.access) {
      saveTokenStorage(response.data.access, response.data.refresh);
    }

    return response;
  },

  async registration(username, email, password, password2) {
    const response = await axiosUnauth.post('/api/register', {
      username,
      email,
      password,
      password2,
    });
    console.log(response);
    return response;
  },

  async getNewTokens(refresh) {
    const response = await axiosUnauth.post('/api/token/refresh/', { refresh });
    console.log(response);

    if (response.data.access) saveTokenStorage(response.data.access, response.data.refresh);

    return response;
  },

  async logout() {
    const response = await axiosWithAuth.post('/api/logout/');

    if (response.status == 200) {
      console.log(response);
      removeFromStorage();
    }

    return response;
  },
};
