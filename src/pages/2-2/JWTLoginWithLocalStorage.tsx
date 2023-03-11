import { useState, FormEvent } from 'react';
import { getCurrentUserInfo, login } from 'api/login';
import { getAccessTokenFromLocalStorage } from 'hooks/tokenLocalStorageHandler';
import { UserInfo } from 'types/user';

export const JWTLoginWithLocalStorage = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const loginSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const loginPayload = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    const loginResult = await login(loginPayload);

    // 통신 실패 시 얼리 리턴
    if (loginResult === 'fail') return;

    // 토큰을 스토리지에서 가져오는 로직을 getCurrentUserInfo 내에서 진행
    const userInfoRes = await getCurrentUserInfo();

    if (!userInfoRes) return;

    setUserInfo(userInfoRes);
  };

  return (
    <div>
      <h1>Login with JWT - localStorage</h1>
      <form onSubmit={loginSubmitHandler}>
        <label>
          Username:
          <input type='text' name='username' />
        </label>
        <label>
          Password:
          <input type='password' name='password' />
        </label>
        <button type='submit'>Submit</button>
      </form>

      <div>
        <h2>UserInfo: </h2>
        {JSON.stringify(userInfo)}
      </div>
    </div>
  );
};
