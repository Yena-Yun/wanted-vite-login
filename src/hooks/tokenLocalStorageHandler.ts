export const saveAccessTokenToLocalStorage = (accessToken: string) => {
  return localStorage.setItem('accessToken', accessToken);
};

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem('accessToken');
};
