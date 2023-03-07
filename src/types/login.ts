export type LoginSuccessMessage = 'SUCCESS'; // type: 어떤 타입을 명확히 정의
export type LoginFailMessage = 'FAIL';

// interface: 객체에 (확장성이 예상되는 경우)
export interface LoginResponse {
  message: LoginSuccessMessage | LoginFailMessage;
  token: string;
}
