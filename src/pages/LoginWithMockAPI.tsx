import { useState, FormEvent } from 'react';
import { _secret } from 'utils/constants/token';
import { users } from 'utils/mocks/user';
import { ParsedToken, User, UserInfo } from 'types/user';
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
  const parsedToken: ParsedToken = JSON.parse(token);

  if (!parsedToken.secret || parsedToken.secret !== _secret) return null;

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

    console.log(formData); // 그냥 formDate로는 브라우저 콘솔에서 안에 있는 값 알 수 없음
    console.log(formData.get('username')); // .get() 메서드에 e.currentTarget.name을 인자로 전달해야 해당 입력값 알 수 있음
    console.log(formData.entries()); // 또는 .entries() 메서드를 찍어보면 formDate로 뭘 할 수 있는지 다 알 수 있음

    // await: 이 코드의 반환값이 나오고 나서 다음 줄 실행
    const loginRes = await login(
      formData.get('username') as string,
      formData.get('password') as string
    );

    // 얼리 리턴 패턴 (문제가 있으면 다음 줄을 실행하기 전 빨리 종료)
    // login 함수에서 반환된 유저가 null이면 리턴
    if (!loginRes) return;

    // 로그인에 성공하면 받은 token으로 userInfo 불러오기
    const userInfo = await getUserInfo(loginRes.token);

    // secret이 없거나 또는 틀리거나
    // DB에서 name이 일치하는 유저가 없으면 리턴
    if (!userInfo) return;

    // userInfo가 있으면 useState에 셋팅
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
