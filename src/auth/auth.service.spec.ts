import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'prisma/prisma.service';
import { IUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';
import { IUserHided } from './auth.interface';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({}),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.ACCESS_TOKEN_KEY,
        }),
      ],
      providers: [AuthService, UsersService, PrismaService],
      exports: [JwtModule],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const testUser: IUser = {
    username: 'testuser',
    password: 'hahaha',
    avatar: null,
  };

  const hidedUser: IUserHided = {
    username: testUser.username,
    avatar: testUser.avatar,
  };

  it('register user', async () => {
    const registeredUser = await service.register(testUser);
    expect(registeredUser.user).toStrictEqual(hidedUser);
    expect(registeredUser.tokens).not.toBeUndefined();
    expect(registeredUser.tokens.accessToken).not.toBeUndefined();
    expect(registeredUser.tokens.refreshToken).not.toBeUndefined();
    expect(registeredUser.tokens.accessToken).not.toBe('');
    expect(registeredUser.tokens.refreshToken).not.toBe('');
    expect(registeredUser.tokens.accessToken).not.toStrictEqual(
      registeredUser.tokens.refreshToken,
    );
  });

  it('login user', async () => {
    const loginedUser = await service.login(
      testUser.username,
      testUser.password,
    );
    expect(loginedUser).not.toBeUndefined();
    expect(loginedUser.accessToken).not.toBeUndefined();
    expect(loginedUser.refreshToken).not.toBeUndefined();
    expect(loginedUser.accessToken).not.toBe('');
    expect(loginedUser.refreshToken).not.toBe('');
    expect(loginedUser.accessToken).not.toStrictEqual(loginedUser.refreshToken);
  });

  afterAll(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    const usersService = userModule.get<UsersService>(UsersService);
    await usersService.deleteUser(testUser);
  });
});
