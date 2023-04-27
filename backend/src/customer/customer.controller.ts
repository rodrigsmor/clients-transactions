import { Body, Controller, Post } from '@nestjs/common';
import { CreateCustomerDto } from './dto';
import { CustomerService } from './customer.service';
import { ResponseDto } from 'src/utils/dto/responseDto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  async createCustomer(
    @Body() customer: CreateCustomerDto,
  ): Promise<ResponseDto> {
    return this.customerService.createCustomer(customer);
  }
}
