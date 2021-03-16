import { IUserHided } from 'src/auth/auth.interface';

export interface IRate {
  userId: string;
  ISOCode: string;
  rateNumber: number;
}

export interface IRateHided {
  user: IUserHided;
  rateNumber: number;
}

export interface ISingleCountryRate {
  rates: IRateHided[];
  averageRateNumber: number;
}
