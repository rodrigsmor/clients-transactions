import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient, Customer } from '@prisma/client';
import { CustomerCreationDto } from './dto';
import { checkIfEmailIsValid } from '../../utils/functions/fieldsChecks';
import { CreateCustomerDto, CustomerDto, CustomersPaginationDto } from './dto';

@Injectable()
export class CustomerService {
  constructor(@Inject(PrismaClient) private prisma: PrismaClient) {}

  async createCustomer(
    customer: CreateCustomerDto,
  ): Promise<CustomerCreationDto> {
    if (customer.email === '' || customer.email === null)
      throw new BadRequestException('O e-mail não pode está vazio.');

    if (!checkIfEmailIsValid(customer.email))
      throw new BadRequestException('O e-mail precisa ser um e-mail válido');

    if (!customer.name || !customer.name)
      throw new BadRequestException('Nome não pode está vázio.');

    const isNameBeingUsed = await this.prisma.customer.findUnique({
      where: { name: customer.name },
    });

    if (Boolean(isNameBeingUsed))
      throw new BadRequestException(
        'O nome de cliente já está em uso. Selecione outro!',
      );

    const isEmailBeingUsed = await this.prisma.customer.findUnique({
      where: { email: customer.email },
    });

    if (Boolean(isEmailBeingUsed))
      throw new BadRequestException('Já há um cliente com esse e-mail');

    const newCustomer = await this.prisma.customer.create({
      data: {
        email: customer.email,
        name: customer.name,
        profile_picture: customer.profilePicture,
        balance_amount: 0,
      },
    });

    return {
      message: 'Cliente criado com sucesso.',
      data: newCustomer,
    };
  }

  async getRecentCustomers(limit: number): Promise<Array<CustomerDto>> {
    const prismaCustomers = await this.prisma.customer.findMany({
      take: Math.floor(limit),
      orderBy: { updatedAt: 'desc' },
      include: { products: true },
    });

    if (!prismaCustomers)
      throw new InternalServerErrorException(
        'Algo deu errado enquanto pegavamos os seus clientes.',
      );

    const recentCustomers: Array<CustomerDto> = prismaCustomers.map(
      (customer) => new CustomerDto(customer),
    );

    if (!recentCustomers)
      throw new InternalServerErrorException(
        'Algo deu errado enquanto retornávamos os seus clientes.',
      );

    return recentCustomers;
  }

  async getAllCustomers(
    currentPage: number,
    pageSize: number,
  ): Promise<CustomersPaginationDto> {
    const skip = (currentPage - 1) * pageSize;
    const take = Math.floor(pageSize);

    const prismaCustomers = await this.prisma.customer.findMany({
      skip,
      take,
      orderBy: { id: 'desc' },
      include: { products: true },
    });

    if (!prismaCustomers)
      throw new InternalServerErrorException(
        'Algo deu errado enquanto pegavamos os seus clientes.',
      );

    const customers: Array<CustomerDto> = prismaCustomers.map(
      (customer) => new CustomerDto(customer),
    );

    if (!customers)
      throw new InternalServerErrorException(
        'Algo deu errado enquanto retornávamos os seus clientes.',
      );

    const total = await this.prisma.customer.count();
    const totalPages = Math.ceil(total / pageSize);

    const meta = {
      hasNext: currentPage < totalPages,
      hasBefore: currentPage > 1,
      pageSize,
      currentPage,
      totalPages,
    };

    return new CustomersPaginationDto(meta, customers);
  }

  async getCustomersById(
    customersId: Array<number>,
  ): Promise<Array<CustomerDto>> {
    const foundCustomers = await this.prisma.customer.findMany({
      where: { id: { in: customersId } },
      include: { products: true },
    });

    if (foundCustomers.length !== customersId.length) {
      const notFoundCustomersIds = customersId.filter(
        (customerId) =>
          !foundCustomers.some((customer) => customer.id === customerId),
      );
      throw new BadRequestException(
        `Cliente com Ids ${notFoundCustomersIds} não foram encontrados`,
      );
    }

    const customersDto = foundCustomers.map(
      (customer) => new CustomerDto(customer),
    );

    return customersDto;
  }
}
