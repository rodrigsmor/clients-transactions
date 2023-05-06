import { ApiProperty } from '@nestjs/swagger';
import { Customer } from '@prisma/client';

export class ResponseDto {
  @ApiProperty()
  readonly data: any;

  @ApiProperty()
  readonly message: string;
}

export class CustomerCreationDto {
  @ApiProperty({
    type: 'object',
    properties: {
      id: {
        example: 1,
        type: 'number',
        description: 'The customer identifier',
      },
      name: {
        example: 'Sofia rodriguez',
        type: 'string',
      },
      email: {
        example: 'sofia.rodriguez22@email.com',
        type: 'string',
      },
      balance_amount: {
        example: 2000,
        type: 'number',
        description: `The customer's balance in cents`,
      },
      profile_picture: {
        example: 'https://images.unsplash.com/photo...',
        type: 'string',
        description: `The customer's profile picture, which in this case can be either a base64 url or a photo url`,
      },
      updatedAt: {
        example: new Date().toISOString(),
        type: 'Date',
        description: 'The date in iso 8601 standard',
      },
    },
  })
  readonly data: Customer;

  @ApiProperty({
    example: 'Customer successfully created',
    description:
      'A message indicating wheter what was requested was properly done.',
  })
  readonly message: string;
}
