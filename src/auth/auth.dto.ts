import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: "Username can't be empty" })
  @IsAlphanumeric(undefined, {
    message: 'Username must contain only letters and numbers',
  })
  @MinLength(1, {
    message: 'Username must be at least 1 character long',
  })
  @MaxLength(50, {
    message: "Username can't be longer than 50 character",
  })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: "Password can't be empty" })
  @MinLength(6, {
    message: 'Password must be at least 6 character long',
  })
  @MaxLength(128, {
    message: "Password can't be longer than 128 character",
  })
  password: string;

  @IsOptional()
  @IsString({ message: 'Avatar must be a string' })
  @IsNotEmpty({ message: "Avatar can't be empty" })
  avatar: string;
}

export class LoginDto {
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: "Username can't be empty" })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: "Password can't be empty" })
  password: string;
}
