import { ApiResponseProperty } from '@nestjs/swagger';

export class LoginResponseVm {
  @ApiResponseProperty()
  token: string;
}
