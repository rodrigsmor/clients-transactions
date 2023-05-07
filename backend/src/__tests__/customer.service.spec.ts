import { CustomerService } from '../api/customer/customer.service';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import {
  CreateCustomerDto,
  CustomerDto,
  CustomersPaginationDto,
} from '../api/customer/dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('CustomerService', () => {
  let customerService: CustomerService;

  const prismaClientMocked = {
    customer: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      count: jest.fn(),
    },
  };

  const customers = [
    {
      id: 1,
      name: 'Bruno Oliveira',
      email: 'bruno@test.com',
      updatedAt: new Date('2023-05-06T10:00:00.000Z'),
      products: [],
      balance_amount: undefined,
      profile_picture: 'http://test.com/test.jpg',
    },
    {
      id: 2,
      name: 'Camila Santos',
      email: 'camila@test.com',
      updatedAt: new Date('2023-05-05T10:00:00.000Z'),
      products: [],
      balance_amount: undefined,
      profile_picture: 'http://test.com/test.jpg',
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        { provide: PrismaClient, useValue: prismaClientMocked },
      ],
    }).compile();

    customerService = app.get<CustomerService>(CustomerService);
  });

  describe('createCustomer', () => {
    const customer: CreateCustomerDto = {
      name: 'Bruno Oliveira',
      email: 'bruno@test.com',
      profilePicture: 'http://test.com/test.jpg',
    };

    it('should throw BadRequestException if email is empty', async () => {
      await expect(
        customerService.createCustomer({ ...customer, email: '' }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if email is not valid', async () => {
      await expect(
        customerService.createCustomer({
          ...customer,
          email: 'bruno_not_email',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException if name is already being used', async () => {
      prismaClientMocked.customer.findUnique.mockResolvedValue({ id: 1 });
      await expect(customerService.createCustomer(customer)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException if email is already being used', async () => {
      prismaClientMocked.customer.findUnique.mockResolvedValue(null);
      prismaClientMocked.customer.findUnique.mockResolvedValue({
        id: 1,
        ...customer,
      });
      await expect(customerService.createCustomer(customer)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should create a new customer if properties are valid', async () => {
      prismaClientMocked.customer.findUnique.mockResolvedValue(null);
      prismaClientMocked.customer.create.mockResolvedValue({
        id: 1,
        ...customer,
        balance_amount: 0,
      });

      const result = await customerService.createCustomer(customer);

      expect(result.message).toBe('Cliente criado com sucesso.');
      expect(result.data).toEqual({ id: 1, ...customer, balance_amount: 0 });
    });

    it('should throw InternalServerErrorException if something goes wrong', async () => {
      prismaClientMocked.customer.findUnique.mockRejectedValue(
        new InternalServerErrorException(),
      );
      await expect(customerService.createCustomer(customer)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('getRecentCustomers', () => {
    it('should return an array of recent customers', async () => {
      prismaClientMocked.customer.findMany.mockResolvedValue(customers);

      const result = await customerService.getRecentCustomers(10);

      expect(result).toEqual(
        customers.map((customer) => new CustomerDto(customer)),
      );
    });

    it('should throw an InternalServerErrorException if something goes wrong', async () => {
      prismaClientMocked.customer.findMany.mockRejectedValue(
        new InternalServerErrorException(),
      );

      await expect(customerService.getRecentCustomers(10)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('getAllCustomers', () => {
    it('should return customers with pagination metada', async () => {
      prismaClientMocked.customer.findMany.mockResolvedValue(customers);
      prismaClientMocked.customer.count.mockResolvedValue(2);

      const result = await customerService.getAllCustomers(1, 10);

      expect(prismaClientMocked.customer.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 10,
        orderBy: { id: 'desc' },
        include: { products: true },
      });

      expect(result).toBeInstanceOf(CustomersPaginationDto);
      expect(result.meta).toEqual({
        hasNext: false,
        hasBefore: false,
        pageSize: 10,
        currentPage: 1,
        totalPages: 1,
      });

      expect(result.data).toEqual(
        customers.map((customer) => new CustomerDto(customer)),
      );
    });
  });
});
