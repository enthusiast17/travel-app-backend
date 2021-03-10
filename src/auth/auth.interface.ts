export interface IAuthTokens {
  refreshToken: string;
  accessToken: string;
}

export interface IJWTData {
  userId: string;
  username: string;
}

export interface IJWTSign extends IJWTData {
  iat: number;
  exp: number;
}

export interface IUserHided {
  username: string;
  avatar: string | null;
}
