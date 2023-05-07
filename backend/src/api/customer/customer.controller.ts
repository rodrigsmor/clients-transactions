import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateCustomerDto, CustomerDto, CustomersPaginationDto } from './dto';
import { CustomerService } from './customer.service';
import { CustomerCreationDto } from './dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Customers')
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'The customer has been successfully created',
    type: CustomerCreationDto,
  })
  @ApiBearerAuth()
  @ApiOperation({
    description:
      'Creating a new customer that can be the producer or affiliate of various products.',
  })
  async createCustomer(
    @Body() customer: CreateCustomerDto,
  ): Promise<CustomerCreationDto> {
    return this.customerService.createCustomer(customer);
  }

  @Get('/recents')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiBearerAuth()
  @ApiOperation({
    description: `Returns a list of customers that have undergone recent changes, and you can limit the number of customers returned by the query 'limit'. The default value of this query is 10 customers.`,
  })
  @ApiResponse({
    status: 202,
    type: [CustomerDto],
    description:
      'The customers who have had the most recent changes based on the limit quantity in the request.',
  })
  @ApiQuery({
    name: 'limit',
    description: 'The number of customer you intend to receive',
    required: false,
    example: 10,
  })
  async getRecentCustomers(
    @Query('limit') limit = 10,
  ): Promise<Array<CustomerDto>> {
    return this.customerService.getRecentCustomers(limit);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({
    description: `Returns a paginated customer list, where it possible to browse the pages by passing page and pageSize queries.`,
  })
  @ApiQuery({
    name: 'page',
    description: 'The number of the current page',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'pageSize',
    description: 'The number of items you want to have on each page.',
    required: false,
    example: 10,
  })
  @ApiResponse({
    status: 200,
    type: CustomersPaginationDto,
  })
  async getCustomers(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<CustomersPaginationDto> {
    return this.customerService.getAllCustomers(page, pageSize);
  }

  @Patch('/ids')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiBearerAuth()
  @ApiOperation({
    description: `Returns a list of customers by Ids`,
  })
  @ApiResponse({
    status: 202,
    type: [CustomerDto],
  })
  async getCustomerById(
    @Body() customersId: Array<number>,
  ): Promise<Array<CustomerDto>> {
    return this.customerService.getCustomersById(customersId);
  }
}
