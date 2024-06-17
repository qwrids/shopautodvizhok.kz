export const errorCatch = (error) => {
  const message = error?.response?.data?.message;

  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message;
};
