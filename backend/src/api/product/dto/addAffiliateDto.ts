import { ApiProperty } from '@nestjs/swagger';

export class AddAffiliateDto {
  @ApiProperty({
    example: 0,
    description:
      'The specific id of the product to which the customer is affiliating',
  })
  productId: number;

  @ApiProperty({
    example: 0,
    description: 'The Id of the customer being affiliated',
  })
  customerId: number;
}
