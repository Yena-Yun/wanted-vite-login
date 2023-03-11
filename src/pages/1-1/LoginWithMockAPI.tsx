import { useState, FormEvent } from 'react';
import { _secret } from 'utils/constants/token';
import { users } from 'utils/mocks/user';
import { Token, User, UserInfo } from 'types/user';
import { LoginResponse } from 'types/login';

const login = async (
  username: string,
  password: string
): Promise<LoginResponse | null> => {
  const user: User | undefined = users.find(
    (user: User) => user.username == username && user.password === password
  );

  return user
    ? {
        message: 'SUCCESS',
        token: JSON.stringify({ user: user.userInfo, secret: _secret }),
      }
    : null;
};

/* async 함수의 반환값은 Promise */
const getUserInfo = async (token: string): Promise<UserInfo | null> => {
  const parsedToken: Token = JSON.parse(token);

  // token에 secret이 없거나 (서버의) _secret과 다르면 null 반환 후 종료
  if (!parsedToken.secret || parsedToken.secret !== _secret) return null;

  // token이 올바른 경우
  // DB에서 userInfo의 name과 token의 username이 같은 데이터를 찾아 반환
  const loggedUser: User | undefined = users.find((user: User) => {
    if (user.userInfo.name === parsedToken.user.name) return user;
  });

  return loggedUser ? loggedUser.userInfo : null;
};

const LoginWithMockAPI = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({ name: '' });

  const loginSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    console.log(formData); // 그냥 formDate로는 FormData {} 출력 - formData에서 사용 가능한 메서드 알 수 있음
    console.log(formData.get('username')); // .get() 메서드에 e.currentTarget.name을 인자로 전달해야 해당 입력값 알 수 있음

    // await: 이 코드의 반환값이 나오고 나서 다음 줄 실행
    const loginRes = await login(
      formData.get('username') as string,
      formData.get('password') as string
    );

    // 얼리 리턴 패턴 (문제가 있으면 다음 줄을 실행하기 이전에 종료)
    // 반환된 값이 falsy이면(= 로그인에 실패하면) 종료
    if (!loginRes) return;

    // 로그인에 성공 시 반환된 결과값의 token으로 userInfo 받아오기
    const userInfo = await getUserInfo(loginRes.token);

    // userInfo가 falsy(null)이면 얼리 리턴
    if (!userInfo) return;

    // userInfo 받아오기에 성공하면
    // jsx에서 사용할 수 있도록 전역의 setState에 전달
    setUserInfo(userInfo);
  };

  return (
    <div>
      <h1>Login with Mock API</h1>
      <form onSubmit={loginSubmitHandler}>
        <label>
          Username:
          <input type='text' name='username' />
        </label>
        <label>
          Password:
          <input type='password' name='password' />
        </label>
        {/* submit 버튼 */}
        <input type='submit' value='Submit' />
      </form>
      <div>
        <h2>User info</h2>
        {/* useState의 userInfo를 렌더링 */}
        {JSON.stringify(userInfo)}
      </div>
    </div>
  );
};

export default LoginWithMockAPI;
