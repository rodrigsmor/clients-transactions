import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { TransactionsDto } from './dto';
import { ResponseDto } from '../../utils/dto/responseDto';
import { TransactionsTypes } from '../../utils/enum';
import { TransactionsPaginationDto } from './dto/transactions.pagination.dto';
import { TransactionsDetailedDto } from './dto/transactions.detailed.dto';
import { Customer, Product } from '@prisma/client';

export interface UpdateCustomersAccountBalanceTypes {
  seller: Customer;
  producer?: Customer;
}

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

    const customerUpdated = await this.updateCustomersAccountBalance(
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

  async updateCustomersAccountBalance(
    transaction: TransactionsDto,
    customer: Customer,
    product: Product,
  ): Promise<UpdateCustomersAccountBalanceTypes> {
    const prisma = new PrismaService();
    let updatedAccountBalance = 0;
    const isToUpdateProducerBalance: boolean = transaction.type === 2;

    if (isToUpdateProducerBalance) {
      const owner = await prisma.customer.findUnique({
        where: { id: product.ownerId },
      });

      updatedAccountBalance =
        owner.balance_amount.toNumber() + transaction.value;
    } else if (transaction.type === 3) {
      updatedAccountBalance =
        customer.balance_amount.toNumber() - transaction.value;
    } else {
      updatedAccountBalance =
        customer.balance_amount.toNumber() + transaction.value;
    }

    const customerUpdated = await prisma.customer.update({
      where: { id: isToUpdateProducerBalance ? product.ownerId : customer.id },
      data: { balance_amount: updatedAccountBalance },
    });

    return isToUpdateProducerBalance
      ? {
          producer: customerUpdated,
          seller: customer,
        }
      : {
          seller: customerUpdated,
        };
  }
}
