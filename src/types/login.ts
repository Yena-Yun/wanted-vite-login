// 실습 1일차
export type LoginSuccessMessage = 'SUCCESS'; // type: 어떤 타입을 명확히 정의
export type LoginFailMessage = 'FAIL';

// interface: 객체에 (확장성이 예상되는 경우)
export interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage;
  token: string;
}

// 실습 2일차
export interface LoginRequest {
  username: string;
  password: string;
}

// 이건 확장성 없어서 type으로
export type LoginResultWithToken =
  | {
      result: 'success';
      access_token: string;
    }
  | {
      result: 'fail';
      access_token: null;
    };

export type LoginResult = 'success' | 'fail';
