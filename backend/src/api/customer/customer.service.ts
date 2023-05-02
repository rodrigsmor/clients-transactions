import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/createCustomerDto';
import { ResponseDto } from 'src/utils/dto/responseDto';
import { PrismaClient } from '@prisma/client';
import { checkIfEmailIsValid } from 'src/utils/functions/fieldsChecks';

@Injectable()
export class CustomerService {
  constructor(@Inject(PrismaClient) private prisma: PrismaClient) {}

  async createCustomer(customer: CreateCustomerDto): Promise<ResponseDto> {
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
}
