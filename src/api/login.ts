import { User } from 'types/user';
import { BASE_URL } from './const';

export const login = async (args: Omit<User, 'userInfo'>) => {
  const loginResponseRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (loginResponseRes.ok) {
    return loginResponseRes.json();
  }

  return null;
};

export const getUserInfo = async ({
  access_token,
}: {
  access_token: string;
}) => {
  const userInfoRes = await fetch(`${BASE_URL}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (userInfoRes.ok) {
    const userInfo = await userInfoRes.json();
    return userInfo.userInfo.name;
  }

  return null;
};
