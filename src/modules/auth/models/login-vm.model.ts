import { IsNotEmpty, MinLength } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ContainsSpecialCharacter } from '@shared/utilities/password.validator';

export class LoginVM {
  @ApiProperty({
    required: true,
    minLength: 6,
  })
  @MinLength(6)
  username: string;

  @MinLength(8)
  @IsNotEmpty()
  @ContainsSpecialCharacter()
  @ApiProperty({
    required: true,
    minLength: 8,
  })
  password: string;
}
