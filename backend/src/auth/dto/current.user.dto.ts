import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class CurrentUserDto {
  @ApiProperty({
    example: 'Admin User 1',
    required: true,
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 'user@test.com',
    description: 'The e-mail of your user.',
  })
  email: string;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo...',
    description: `The customer's profile picture, which in this case can be either a base64 url or a photo url`,
  })
  profile_picture: string;

  constructor(user: User) {
    this.name = user.name;
    this.email = user.email;
  }
}
