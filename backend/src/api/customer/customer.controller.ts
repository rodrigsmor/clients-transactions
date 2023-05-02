import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCustomerDto, CustomerDto, CustomersPaginationDto } from './dto';
import { CustomerService } from './customer.service';
import { ResponseDto } from 'src/utils/dto/responseDto';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCustomer(
    @Body() customer: CreateCustomerDto,
  ): Promise<ResponseDto> {
    return this.customerService.createCustomer(customer);
  }

  @Get('/recents')
  @HttpCode(HttpStatus.ACCEPTED)
  async getRecentCustomers(
    @Query('limit') limit = 10,
  ): Promise<Array<CustomerDto>> {
    return this.customerService.getRecentCustomers(limit);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getCustomers(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<CustomersPaginationDto> {
    return this.customerService.getAllCustomers(page, pageSize);
  }
}
