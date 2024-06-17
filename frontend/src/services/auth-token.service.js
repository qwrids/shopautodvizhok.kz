import Cookies from 'js-cookie';

export const tokens = {
  ACCESS_TOKEN: 'access',
  REFRESH_TOKEN: 'refresh',
};

export const getTokens = () => {
  const accessToken = Cookies.get(tokens.ACCESS_TOKEN);
  const refreshToken = Cookies.get(tokens.REFRESH_TOKEN);

  return { accessToken, refreshToken } || null;
};

export const saveTokenStorage = (accessToken, refreshToken) => {
  Cookies.set(tokens.ACCESS_TOKEN, accessToken, {
    sameSite: 'lax',
    expires: 1,
  });
  Cookies.set(tokens.REFRESH_TOKEN, refreshToken, {
    sameSite: 'lax',
    expires: 30,
  });
};

export const removeFromStorage = () => {
  Cookies.set(tokens.ACCESS_TOKEN, '', {
    sameSite: 'lax',
    expires: 0,
  });
  Cookies.set(tokens.REFRESH_TOKEN, '', {
    sameSite: 'lax',
    expires: 0,
  });
};
