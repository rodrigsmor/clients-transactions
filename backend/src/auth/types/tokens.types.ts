import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty({
    description: `
      This is the access token that you will need to use in order to use the application's resources. To use this in swagger or even another application, you will need to make a request with an Authentication header that has this content: 'Bearer <access_token>'
    `,
  })
  access_token: string;

  @ApiProperty({
    description: `
      This token is similar to the access_token, but it has a longer lifetie and is used to recover your access token. This means that you will have o make a request to '/auth/refresh' to be able to user the application again.
    `,
  })
  refresh_token: string;
}
