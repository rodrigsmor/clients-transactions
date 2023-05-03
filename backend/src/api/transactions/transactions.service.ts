import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionsDto } from './dto';
import { ResponseDto } from 'src/utils/dto/responseDto';
import { TransactionsTypes } from 'src/utils/enum';
import { updateCustomersAccountBalance } from 'src/utils/functions/account.balance.function';
import { TransactionsPaginationDto } from './dto/transactions.pagination.dto';
import { TransactionsDetailedDto } from './dto/transactions.detailed.dto';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}

  async saveCustomerTransactions(data: TransactionsDto): Promise<ResponseDto> {
    const seller = await this.prisma.customer.findUnique({
      where: { name: data.seller },
    });

    if (!seller)
      throw new BadRequestException(
        'O vendedor associado a essa transação não existe!',
      );

    const product = await this.prisma.product.findUnique({
      where: { name: data.product },
    });

    if (!product)
      throw new BadRequestException(
        'O produto associado a essa transação não existe!',
      );

    const customerUpdated = await updateCustomersAccountBalance(
      data,
      seller,
      product,
    );

    const transaction = await this.prisma.transaction.create({
      data: {
        date: data.date,
        value: data.value,
        customer: { connect: { id: seller.id } },
        product: { connect: { id: product.id } },
        type: TransactionsTypes[data.type - 1],
      },
    });

    return {
      data: { transaction, customers: customerUpdated },
      message: 'Transação salva com êxito!',
    };
  }

  async getAllTransactions(
    currentPage: number,
    pageSize: number,
  ): Promise<TransactionsPaginationDto> {
    const skip = (currentPage - 1) * pageSize;
    const take = Math.floor(pageSize);

    const prismaTransactions = await this.prisma.transaction.findMany({
      skip,
      take,
      orderBy: { date: 'desc' },
      include: { customer: true, product: true },
    });

    if (!prismaTransactions)
      throw new InternalServerErrorException(
        'Algo deu errado enquanto consultavamos as transações.',
      );

    const transactions: Array<TransactionsDetailedDto> = prismaTransactions.map(
      (transaction) => new TransactionsDetailedDto(transaction),
    );

    if (!transactions)
      throw new InternalServerErrorException(
        'Algo deu errado enquanto tratavamos as transações.',
      );

    const total = await this.prisma.transaction.count();
    const totalPages = Math.ceil(total / pageSize);

    const meta = {
      hasNext: currentPage < totalPages,
      hasBefore: currentPage > 1,
      pageSize,
      currentPage,
      totalPages,
    };

    return new TransactionsPaginationDto(meta, transactions);
  }
}
