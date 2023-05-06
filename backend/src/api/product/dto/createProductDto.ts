import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    required: true,
    example: 'UI / UX for beginners',
    description: 'The name of the product you want to create',
  })
  name: string;

  @ApiProperty({
    required: true,
    example: 2,
    description: 'The Id of the owner of the product',
  })
  ownerId: number;
}
