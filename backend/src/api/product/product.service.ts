import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ResponseDto } from 'src/utils/dto/responseDto';

@Injectable()
export class ProductService {
  constructor(@Inject(PrismaClient) private prisma: PrismaClient) {}

  async createProduct(
    productName: string,
    ownerId: number,
  ): Promise<ResponseDto> {
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

    return {
      data: product,
      message: 'Produto criado com êxito!',
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
