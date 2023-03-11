import {
  getAccessTokenFromLocalStorage,
  saveAccessTokenToLocalStorage,
} from 'hooks/tokenLocalStorageHandler';
import { LoginRequest, LoginResult, LoginResultWithToken } from 'types/login';
import { User, UserInfo } from 'types/user';
import { BASE_URL } from './const';
import { fetchClientWithToken } from './fetchClientWithToken';

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
  // const getUserRes = await fetch(`${BASE_URL}/profile`, {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  const getUserRes = await fetchClientWithToken(`${BASE_URL}/profile`, {
    method: 'GET',
  });

  if (getUserRes.ok) {
    const userResponseData = await getUserRes.json();

    // 반환값이 명확하도록 적절히 가공해서 반환
    return userResponseData.userInfo.name;
  }

  return null;
};

export const login = async (args: LoginRequest): Promise<LoginResult> => {
  const loginResponseRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });

  if (loginResponseRes.ok) {
    const loginResponseData = await loginResponseRes.json();

    saveAccessTokenToLocalStorage(loginResponseData.access_token);
    return 'success';
  }

  return 'fail';
};

export const getCurrentUserInfo = async (): Promise<UserInfo | null> => {
  const userInfoRes = await fetchClientWithToken(`${BASE_URL}/profile`, {
    method: 'GET',
  });

  if (userInfoRes.ok) {
    // const userResponse = await userInfoRes.json();
    // return userResponse.userInfo.name;

    // 또는
    return userInfoRes.json() as Promise<UserInfo>; // ~.json() 로직 뒤에 as Promise<반환값 타입>으로 단언하면 앞에 await를 붙인 것으로 인식 + 바로 해당 반환 타입으로 반환
  }

  return null;
};
