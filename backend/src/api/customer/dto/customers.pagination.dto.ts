import { CustomerDto } from './';
import MetaType from '../../../utils/@types/pagination.metadata';

export class CustomersPaginationDto {
  data: Array<CustomerDto>;
  meta: MetaType;

  constructor(meta: MetaType, data: Array<CustomerDto>) {
    this.data = data;
    this.meta = meta;
  }
}
