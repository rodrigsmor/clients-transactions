import { ApiProperty } from '@nestjs/swagger';

export default class MetaType {
  @ApiProperty({
    example: false,
  })
  hasNext: boolean;

  @ApiProperty({
    example: true,
  })
  hasBefore: boolean;

  @ApiProperty({
    example: 10,
    description: 'The number of items that exist on each page',
  })
  pageSize: number;

  @ApiProperty({
    example: 10,
  })
  currentPage: number;

  @ApiProperty({
    example: 10,
  })
  totalPages: number;
}
