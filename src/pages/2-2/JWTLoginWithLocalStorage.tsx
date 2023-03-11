import { getCurrentUserInfo, login } from 'api/login';
import { getAccessTokenFromLocalStorage } from 'hooks/tokenLocalStorageHandler';
import { useState, FormEvent } from 'react';
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

    if (loginResult === 'success') {
      const accessToken = getAccessTokenFromLocalStorage();

      if (!accessToken) return;

      const userInfoRes = await getCurrentUserInfo(accessToken);

      if (!userInfoRes) return;

      setUserInfo(userInfoRes);
    }
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
