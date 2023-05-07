import { ApiProperty } from '@nestjs/swagger';
import { Customer, Product, Transaction } from '@prisma/client';
import { TransactionsTypes } from 'src/utils/enum';

export class TransactionsDetailedDto {
  @ApiProperty({
    example: 0,
    type: 'number',
    description: 'The id of the transaction',
  })
  id: number;

  @ApiProperty({
    type: 'string',
    enum: TransactionsTypes,
    example: TransactionsTypes.AFFILIATE_SALES,
    description:
      'This is the transaction type, which will indicate whether it was a producer or affiliate sale, or even a payment or a commission receive',
  })
  type: string;

  @ApiProperty({
    type: 'object',
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
    },
  })
  product: {
    id: number;
    name: string;
  };

  @ApiProperty({
    type: 'object',
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
      profile_picture: {
        example: 'https://images.unsplash.com/photo...',
        type: 'string',
      },
    },
  })
  customer: {
    id: number;
    name: string;
    email: string;
    profile_picture: string;
  };

  @ApiProperty({
    example: new Date().toISOString(),
    type: 'Date',
    description: 'The date in iso 8601 standard',
  })
  date: Date;

  @ApiProperty({
    description: 'The transaction value in cents',
    type: 'number',
    example: 12030,
  })
  value: number;

  constructor(
    transaction: Transaction & {
      product: Product;
      customer: Customer;
    },
  ) {
    this.id = transaction.id;
    this.date = transaction.date;
    this.type = transaction.type;
    this.value = transaction.value;
    this.product = {
      id: transaction.product.id,
      name: transaction.product.name,
    };
    this.customer = {
      id: transaction.customer.id,
      name: transaction.customer.name,
      email: transaction.customer.email,
      profile_picture: transaction.customer.profile_picture,
    };
  }
}
