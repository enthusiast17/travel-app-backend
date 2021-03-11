import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { genSalt, hash, compare } from 'bcrypt';
import { IUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
import { IAuthToken, IJWTData } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async generateToken(
    data: IJWTData,
    secret: string,
    expiresIn: string,
  ): Promise<string> {
    return this.jwtService.sign(data, {
      secret,
      expiresIn,
      algorithm: 'HS256',
    });
  }

  async register(user: IUser): Promise<IAuthToken> {
    const salt = await genSalt(parseFloat(process.env.SALT_NUMBER));
    const hashedPassword = await hash(user.password, salt);
    const registeredUser = await this.usersService.createUser({
      ...user,
      password: hashedPassword,
    });
    const jwtData: IJWTData = {
      userId: registeredUser.id,
      username: registeredUser.username,
    };
    return {
      refreshToken: await this.generateToken(
        jwtData,
        process.env.REFRESH_TOKEN_KEY,
        process.env.REFRESH_TOKEN_EXP,
      ),
    };
  }

  async login(username: string, password: string): Promise<IAuthToken | null> {
    const user: User = await this.usersService.findUserByUsername(username);
    if (!user || !(await compare(password, user.password))) {
      return null;
    }
    const jwtData: IJWTData = { userId: user.id, username: user.username };
    return {
      refreshToken: await this.generateToken(
        jwtData,
        process.env.REFRESH_TOKEN_KEY,
        process.env.REFRESH_TOKEN_EXP,
      ),
    };
  }

  async isUsernameExists(username: string): Promise<boolean> {
    const foundUserByUsername: User = await this.usersService.findUserByUsername(
      username,
    );
    return foundUserByUsername ? true : false;
  }
}
