import { getUserInfo, login } from 'api/login';
import { useState, FormEvent } from 'react';
import { UserInfo } from 'types/user';

export const JWTLogin = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const loginSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const loginRes = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    const loginResponseRes = await login(loginRes);

    const userInfoRes = await getUserInfo(loginResponseRes);

    setUserInfo(userInfoRes);
  };

  return (
    <div>
      <h1>Login with JWT - in memory</h1>
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
        <h2>User Info</h2>
        {JSON.stringify(userInfo)}
      </div>
    </div>
  );
};
