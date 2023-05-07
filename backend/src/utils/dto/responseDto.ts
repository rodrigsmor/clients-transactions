import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty()
  readonly data: any;

  @ApiProperty()
  readonly message: string;
}
