import { LoginRequest, LoginResultWithToken } from 'types/login';
import { User, UserInfo } from 'types/user';
import { BASE_URL } from './const';

export const loginWithToken = async (
  args: LoginRequest
): Promise<LoginResultWithToken> => {
  const loginResponseRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (loginResponseRes.ok) {
    const { access_token } = await loginResponseRes.json();

    return {
      result: 'success',
      access_token,
    };
  }

  return {
    result: 'fail',
    access_token: null,
  };
};

export const getCurrentUserInfoWithToken = async (
  token: string
): Promise<UserInfo | null> => {
  const getUserRes = await fetch(`${BASE_URL}/profile`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (getUserRes.ok) {
    const userResponseData = await getUserRes.json();
    return userResponseData.userInfo.name;
  }

  return null;
};
