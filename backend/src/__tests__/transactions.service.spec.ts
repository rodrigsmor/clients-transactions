import {
  TransactionsService,
  UpdateCustomersAccountBalanceTypes,
} from '../api/transactions/transactions.service';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionsDto } from '../api/transactions/dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { TransactionsTypes } from '../utils/enum';
import { Customer, Product, Transaction } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { TransactionsPaginationDto } from '../api/transactions/dto/transactions.pagination.dto';
import { TransactionsDetailedDto } from '../api/transactions/dto/transactions.detailed.dto';

describe('TransactionsService', () => {
  let transactionsService: TransactionsService;
  let prismaService: PrismaService;

  beforeEach(() => {
    prismaService = new PrismaService();
    transactionsService = new TransactionsService(prismaService);
  });

  const transactionDto: TransactionsDto = {
    seller: 'Bruno Oliveira',
    product: 'PRODUCT TEST',
    value: 50,
    type: 1,
    date: new Date().toISOString(),
  };

  const product: Product = {
    id: 1,
    name: 'PRODUCT TEST',
    ownerId: 2,
  };

  const customer: Customer = {
    id: 1,
    name: 'Bruno Oliveira',
    email: 'bruno@test.com',
    profile_picture: 'http://image.teste/bruno.jpg',
    updatedAt: new Date(Date.now()),
    balance_amount: new Decimal('100.00'),
  };

  const transaction: Transaction = {
    id: 1,
    customerId: 1,
    productId: 1,
    type: String(TransactionsTypes.AFFILIATE_SALES),
    value: 400,
    date: new Date(Date.now()),
  };

  describe('saveCustomerTransactions', () => {
    it('should save transaction successfully', async () => {
      const mockUpdateCustomersAccountBalanceResult: UpdateCustomersAccountBalanceTypes =
        {
          seller: customer,
        };

      jest
        .spyOn(prismaService.customer, 'findUnique')
        .mockResolvedValue(customer);

      jest
        .spyOn(prismaService.product, 'findUnique')
        .mockResolvedValue(product);

      jest
        .spyOn(transactionsService, 'updateCustomersAccountBalance')
        .mockImplementation(() =>
          Promise.resolve(mockUpdateCustomersAccountBalanceResult),
        );

      jest
        .spyOn(prismaService.transaction, 'create')
        .mockResolvedValue(transaction);

      const result = await transactionsService.saveCustomerTransactions(
        transactionDto,
      );

      expect(result.message).toEqual('Transação salva com êxito!');
      expect(result.data.transaction).toEqual(transaction);
      expect(result.data.customers).toEqual({
        seller: customer,
      });
    });

    it('should throw BadRequestException if seller does not exist', async () => {
      jest
        .spyOn(prismaService.customer, 'findUnique')
        .mockRejectedValue(new BadRequestException());

      await expect(
        transactionsService.saveCustomerTransactions(transactionDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if product does not exist', async () => {
      jest
        .spyOn(prismaService.customer, 'findUnique')
        .mockResolvedValue(customer);

      jest.spyOn(prismaService.product, 'findUnique').mockResolvedValue(null);

      await expect(
        transactionsService.saveCustomerTransactions(transactionDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException if prisma throws error', async () => {
      jest
        .spyOn(prismaService.customer, 'findUnique')
        .mockRejectedValue(new InternalServerErrorException());

      await expect(
        transactionsService.saveCustomerTransactions(transactionDto),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('getAllTransactions', () => {
    const transaction: Transaction & {
      product: Product;
      customer: Customer;
    } = {
      id: 1,
      date: new Date(),
      value: 100,
      type: String(TransactionsTypes.AFFILIATE_SALES),
      customer: {
        id: 1,
        name: 'Bruno Oliveira',
        balance_amount: new Decimal(1000),
        email: 'bruno@test.com',
        profile_picture: 'http://image.test/bruno.jpg',
        updatedAt: new Date(Date.now()),
      },
      product: {
        id: 1,
        name: 'Product',
        ownerId: 1,
      },
      productId: 1,
      customerId: 1,
    };

    const transactions = [transaction];
    const mockPageSize = 10;
    const mockCurrentPage = 1;
    const mockTotalPages = 1;
    const mockMeta = {
      hasNext: false,
      hasBefore: false,
      pageSize: mockPageSize,
      currentPage: mockCurrentPage,
      totalPages: mockTotalPages,
    };

    it('should return all transactions with meta data', async () => {
      jest
        .spyOn(prismaService.transaction, 'findMany')
        .mockResolvedValueOnce(transactions);

      jest.spyOn(prismaService.transaction, 'count').mockResolvedValueOnce(1);

      const result = await transactionsService.getAllTransactions(
        mockCurrentPage,
        mockPageSize,
      );

      expect(prismaService.transaction.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: mockPageSize,
        orderBy: { date: 'desc' },
        include: { customer: true, product: true },
      });
      expect(prismaService.transaction.count).toHaveBeenCalled();
      expect(result).toEqual(
        new TransactionsPaginationDto(mockMeta, [
          new TransactionsDetailedDto(transaction),
        ]),
      );
    });

    it('should throw an InternalServerErrorException if the transactions are not found', async () => {
      jest
        .spyOn(prismaService.transaction, 'findMany')
        .mockResolvedValueOnce(undefined);

      jest.spyOn(prismaService.transaction, 'count').mockResolvedValueOnce(0);

      await expect(
        transactionsService.getAllTransactions(mockCurrentPage, mockPageSize),
      ).rejects.toThrow(InternalServerErrorException);
    });
  });
});
