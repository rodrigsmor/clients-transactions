import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './ProductDto';
import { Prisma } from '@prisma/client';

export class ProductResponseDto {
  @ApiProperty({
    example: `Adds Rodrigo as an affiliate of the product "Software engineer junior"`,
    description:
      'A message indicating wheter what was requested was properly done.',
  })
  message: string;

  @ApiProperty({
    type: 'object',
    properties: {
      product: {
        properties: {
          id: {
            example: 0,
            type: 'number',
            description: 'The id of the product',
          },
          name: {
            type: 'string',
            example: 'SOFTWARE ENGINEER JUNIOR',
          },
          ownerId: {
            example: 12,
            type: 'number',
          },
        },
      },
      customer: {
        properties: {
          id: {
            example: 0,
            type: 'number',
          },
          name: {
            example: 'Customer Test 1',
            type: 'string',
          },
          email: {
            example: 'customer@example.com',
            type: 'string',
          },
          balance_amount: {
            example: 12,
            type: 'number',
            description: 'The customer balance in cents',
          },
          profile_picture: {
            example: 'https://images.unsplash.com/photo...',
            type: 'string',
          },
          updatedAt: {
            example: new Date().toISOString(),
            type: 'Date',
            description: 'The date in iso 8601 standard',
          },
        },
      },
    },
  })
  data: {
    product: ProductDto;
    customer: {
      id: number;
      name: string;
      email: string;
      balance_amount: Prisma.Decimal;
      profile_picture: string | null;
      updatedAt: Date;
    };
  };
}
