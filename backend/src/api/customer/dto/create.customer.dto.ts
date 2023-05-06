import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({
    required: true,
    example: 'Sofia rodriguez',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 'sofia.rodriguez22@email.com',
    description: `The customer's e-mail`,
  })
  email: string;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo...',
    description: `The customer's profile picture, which in this case can be either a base64 url or a photo url`,
  })
  profilePicture?: string;
}
