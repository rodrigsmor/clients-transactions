import { ApiProperty } from '@nestjs/swagger';
import { TransactionsTypes } from 'src/utils/enum';

export class TransactionsDto {
  @ApiProperty({
    enum: TransactionsTypes,
    example: TransactionsTypes.COMMISSION_PAID,
  })
  type: number;

  @ApiProperty({
    example: new Date().toISOString(),
    type: 'string',
    description: 'The date in iso 8601 standard',
  })
  date: string;

  @ApiProperty({
    type: 'string',
    example: 'SOFTWARE ENGINEER JUNIOR',
  })
  product: string;

  @ApiProperty({
    example: 12,
    type: 'number',
    description: 'The value of transaction in cents',
  })
  value: number;

  @ApiProperty({
    example: 'CARLOS EDUARDO',
    description:
      'The identification name of the seller who made the transaction. This name must be unique.',
  })
  seller: string;
}
