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

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  saveCustomerTransactions(
    @Body() data: TransactionsDto,
  ): Promise<ResponseDto> {
    return this.transactionsService.saveCustomerTransactions(data);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTransactions(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ) {
    return this.transactionsService.getAllTransactions(page, pageSize);
  }
}
