import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { IAuthToken } from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterDto): Promise<IAuthToken> {
    if (await this.authService.isUsernameExists(registerDto.username)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Username is already exists',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (registerDto.avatar) {
      const avatarSize = Buffer.from(registerDto.avatar, 'base64').toString(
        'binary',
      ).length;
      if (avatarSize > 1000000) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            message: 'Avatar is too large. Avatar must be smaller than 1 MB',
            error: 'Bad Request',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    return this.authService.register(registerDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<IAuthToken> {
    const response = await this.authService.login(
      loginDto.username,
      loginDto.password,
    );

    if (!response) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Username or password is wrong',
          error: 'Bad Request',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return response;
  }
}
