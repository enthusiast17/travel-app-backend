import { HttpException, HttpStatus } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({}),
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
          secret: process.env.ACCESS_TOKEN_KEY,
        }),
      ],
      controllers: [AuthController],
      providers: [AuthService, PrismaService, UsersService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const testUser = { username: 'test', password: 'testtest01' };
  const existError = new HttpException(
    {
      status: HttpStatus.BAD_REQUEST,
      message: 'Username is already exists',
      error: 'Bad Request',
    },
    HttpStatus.BAD_REQUEST,
  );

  it('register valid user', async () => {
    const registeredUser = await controller.register(testUser);
    expect(registeredUser.user).not.toBeUndefined();
    expect(registeredUser.tokens).not.toBeUndefined();
    expect(registeredUser.tokens.accessToken).not.toBeUndefined();
    expect(registeredUser.tokens.refreshToken).not.toBeUndefined();
  });

  it('register existed user', async () => {
    try {
      await controller.register(testUser);
    } catch (error) {
      expect(error).toStrictEqual(existError);
    }
  });

  afterAll(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    const usersService = userModule.get<UsersService>(UsersService);
    await usersService.deleteUser(testUser);
  });
});
