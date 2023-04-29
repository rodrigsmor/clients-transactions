import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TransactionsDto } from './dto';
import { ResponseDto } from 'src/utils/dto/responseDto';
import { TransactionsTypes } from 'src/utils/enum';
import { updateCustomersAccountBalance } from 'src/utils/functions/account.balance.function';

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
}
