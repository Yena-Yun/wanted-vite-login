import { getCurrentUserInfoWithToken, loginWithToken } from 'api/login';
import { useState, FormEvent } from 'react';
import { UserInfo } from 'types/user';

export const JWTLogin = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const loginSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const loginPayload = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };

    // 통신 이후의 결과값에 커서 올리면 타입 나오도록
    const loginResult = await loginWithToken(loginPayload);

    // 통신 실패일 경우 꼭 예외 처리
    if (loginResult.result === 'fail') return;

    const userInfoRes = await getCurrentUserInfoWithToken(
      loginResult.access_token
    );

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
