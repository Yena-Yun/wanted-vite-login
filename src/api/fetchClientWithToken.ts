import { getAccessTokenFromLocalStorage } from 'hooks/tokenLocalStorageHandler';

export const fetchClientWithToken = async (
  url: string,
  options: RequestInit
): Promise<Response> => {
  const accessToken = getAccessTokenFromLocalStorage();

  const newOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  };

  return fetch(url, newOptions);
};
