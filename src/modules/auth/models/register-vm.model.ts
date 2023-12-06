import { IsEmail, IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';
import { ContainsSpecialCharacter } from '@shared/utilities/password.validator';

export class RegisterVm {
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({
    required: true,
    minLength: 6,
  })
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  @ContainsSpecialCharacter()
  @ApiProperty({
    required: true,
    minLength: 6,
  })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    required: true,
  })
  email: string;

  @IsOptional()
  phone: string;
}
