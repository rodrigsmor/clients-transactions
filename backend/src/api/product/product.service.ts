import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProductResponseDto } from './dto';
import { ProductDto } from './dto/ProductDto';

@Injectable()
export class ProductService {
  constructor(@Inject(PrismaClient) private prisma: PrismaClient) {}

  async createProduct(
    productName: string,
    ownerId: number,
  ): Promise<ProductDto> {
    if (!productName || productName === '')
      throw new BadRequestException(
        'É preciso declarar um nome para o seu produto.',
      );

    const wasTheNameUsed = await this.hasProductNameAlreadyUsed(productName);
    if (wasTheNameUsed)
      throw new BadRequestException(
        'Nome de produto já em uso. Selecione outro!',
      );

    if (!ownerId) throw new BadRequestException('Informe o dono desse produto');

    const owner = await this.prisma.customer.findUnique({
      where: {
        id: ownerId,
      },
    });

    if (!owner)
      throw new BadRequestException('O cliente informado não existe!');

    const product = await this.prisma.product.create({
      data: {
        name: productName,
        ownerId,
      },
    });

    return product;
  }

  async addAffiliateToProduct(
    productId: number,
    customerId: number,
  ): Promise<ProductResponseDto> {
    if (!productId || productId === null || customerId === null || !customerId)
      throw new BadRequestException(
        'Você deve informar o id do produto e do cliente!',
      );

    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });

    if (!customer)
      throw new BadRequestException('O usuário informado não existe!');

    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        name: true,
        affiliates: true,
      },
    });

    if (!product)
      throw new BadRequestException('O produto informado não existe!');

    const productUpdated = await this.prisma.product.update({
      where: { id: productId },
      data: { affiliates: { connect: { id: customer.id } } },
    });

    if (!productUpdated)
      throw new InternalServerErrorException(
        'Algo deu errado ao tentar adicionar afiliado. Tente novamente mais tarde!',
      );

    return {
      message: `Adiciona o ${customer.name} como afiliado do produto "${product.name}"`,
      data: {
        product: productUpdated,
        customer,
      },
    };
  }

  async hasProductNameAlreadyUsed(productName: string): Promise<boolean> {
    const product = await this.prisma.product.findMany({
      where: {
        name: productName,
      },
      select: {
        id: true,
      },
    });

    return product.length > 0;
  }
}
