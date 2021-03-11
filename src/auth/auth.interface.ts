export interface IAuthToken {
  refreshToken: string;
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
