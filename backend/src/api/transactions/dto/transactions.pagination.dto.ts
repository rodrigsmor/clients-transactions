import { ApiProperty } from '@nestjs/swagger';
import MetaType from '../../../utils/@types/pagination.metadata';
import { TransactionsDetailedDto } from './transactions.detailed.dto';

export class TransactionsPaginationDto {
  meta: MetaType;

  @ApiProperty({
    type: TransactionsDetailedDto,
  })
  data: Array<TransactionsDetailedDto>;

  constructor(meta: MetaType, data: Array<TransactionsDetailedDto>) {
    this.data = data;
    this.meta = meta;
  }
}
