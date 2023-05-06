import { ApiProperty } from '@nestjs/swagger';
import { Customer, Product } from '@prisma/client';

export class CustomerDto {
  @ApiProperty({
    example: 0,
    type: 'number',
    description: 'The customer identifier',
  })
  id: number;

  @ApiProperty({
    example: 'Sofia rodriguez',
    type: 'string',
  })
  name: string;

  @ApiProperty({
    example: 'sofia.rodriguez22@email.com',
    type: 'string',
  })
  email: string;

  @ApiProperty({
    example: 1000,
    type: 'number',
    description: 'The balance amount of this customer',
  })
  balance_amount: number;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo...',
    type: 'string',
    description: `The customer's profile picture, which in this case can be either a base64 uel or a photo url`,
  })
  profile_picture: string;

  @ApiProperty({
    example: 12,
    type: 'number',
    description: 'the number of products thsi customer is affiliated with',
  })
  number_of_products: number;

  constructor(customer: Customer & { products: Product[] }) {
    this.id = customer.id;
    this.name = customer.name;
    this.email = customer.email;
    this.balance_amount = customer.balance_amount as unknown as number;
    this.profile_picture = customer.profile_picture;
    this.number_of_products = customer.products.length;
  }
}
