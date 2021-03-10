import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDto, RegisterDto } from './auth.dto';
import { IAuthTokens, IUserHided } from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(
    @Body() registerDto: RegisterDto,
  ): Promise<{ user: IUserHided; tokens: IAuthTokens }> {
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

    // TO-DO: Add avatar upload checker

    return this.authService.register(registerDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<IAuthTokens> {
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
