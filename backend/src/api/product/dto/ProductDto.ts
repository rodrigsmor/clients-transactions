import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    example: 0,
    description: 'The id of the product',
  })
  id: number;

  @ApiProperty({
    example: 'SOFTWARE ENGINEER JUNIOR',
  })
  name: string;

  @ApiProperty({
    example: 12,
  })
  ownerId: number;
}
