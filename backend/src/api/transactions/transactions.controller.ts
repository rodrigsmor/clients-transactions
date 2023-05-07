import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsDto } from './dto';
import { ResponseDto } from 'src/utils/dto/responseDto';
import { TransactionsPaginationDto } from './dto/transactions.pagination.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Will record the transaction made by the customer',
  })
  @ApiResponse({
    status: 201,
    type: TransactionsDto,
  })
  saveCustomerTransactions(
    @Body() data: TransactionsDto,
  ): Promise<ResponseDto> {
    return this.transactionsService.saveCustomerTransactions(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
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
  @ApiOperation({
    description:
      'will get all transactions by the customers, but in a paginated form, so you browse between pages',
  })
  @ApiResponse({
    status: 200,
    type: TransactionsPaginationDto,
  })
  async getAllTransactions(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<TransactionsPaginationDto> {
    return this.transactionsService.getAllTransactions(page, pageSize);
  }
}
