import { getCurrentUserInfo } from 'api/login';
import { useCallback, useEffect, useRef, useState } from 'react';
import { UserInfo } from 'types/user';

export const AutoLogin = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const isDataFetched = useRef(false);

  // useCallback의 두번째 인자로 빈 배열을 설정하면, 항상 바로 직전의 함수를 수행한다.
  // (즉, state가 변하지 않는 이상 mount 시점의 함수만을 기억하고 실행)
  // 배열 내에 값이 있으면 해당 값이 변경될 때만 함수를 리렌더링한다.
  // (배열 내의 값이 변경될 때까지 저장해놓고 함수를 재사용)
  const getUserInfo = useCallback(async () => {
    const userInfo = await getCurrentUserInfo();

    if (!userInfo) return;

    setUserInfo(userInfo);

    isDataFetched.current = true;
  }, []);

  useEffect(() => {
    if (isDataFetched.current) return;

    getUserInfo();
  }, []);

  return (
    <div>
      <h1>Another Page</h1>
      <div>
        <h2>User info</h2>
        {JSON.stringify(userInfo)}
      </div>
    </div>
  );
};
