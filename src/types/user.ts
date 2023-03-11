export interface UserInfo {
  name: string;
}

export interface User {
  username: string;
  password: string;
  userInfo: UserInfo;
}

export interface Token {
  secret: string;
  user: UserInfo;
}
