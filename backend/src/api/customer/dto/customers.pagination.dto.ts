import { CustomerDto } from './';

interface metaType {
  hasNext: boolean;
  hasBefore: boolean;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}

export class CustomersPaginationDto {
  data: Array<CustomerDto>;
  meta: metaType;

  constructor(meta: metaType, data: Array<CustomerDto>) {
    this.data = data;
    this.meta = meta;
  }
}
