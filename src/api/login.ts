import { LoginRequest, LoginResultWithToken } from 'types/login';
import { User, UserInfo } from 'types/user';
import { BASE_URL } from './const';

// 반환값 타입 반드시 지정 + 타입에 맞는 구체적인 반환값 반환
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

    // 반환값이 명확하도록 적절히 가공해서 반환
    return userResponseData.userInfo.name;
  }

  return null;
};
