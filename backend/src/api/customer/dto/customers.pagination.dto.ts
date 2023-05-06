import { CustomerDto } from './';
import MetaType from '../../../utils/@types/pagination.metadata';
import { ApiProperty } from '@nestjs/swagger';

export class CustomersPaginationDto {
  @ApiProperty({
    description: 'The customers of the current page',
    type: [CustomerDto],
  })
  data: Array<CustomerDto>;

  @ApiProperty({
    description: 'Data about page navigation',
  })
  meta: MetaType;

  constructor(meta: MetaType, data: Array<CustomerDto>) {
    this.data = data;
    this.meta = meta;
  }
}
