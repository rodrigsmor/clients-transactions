import { PrismaClient } from '@prisma/client';
import { ProductService } from '../api/product/product.service';
import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

describe('ProductService', () => {
  let productService: ProductService;
  const prismaClientMock = {
    product: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
    customer: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: PrismaClient, useValue: prismaClientMock },
      ],
    }).compile();

    productService = app.get<ProductService>(ProductService);
  });

  describe('createProduct', () => {
    it('should create a product with the given product name and owner Id', async () => {
      prismaClientMock.customer.findUnique.mockResolvedValueOnce({
        id: 1,
        name: 'Bruno Oliveira',
      });

      prismaClientMock.product.create.mockResolvedValueOnce({
        id: 1,
        name: 'TEST PRODUCT',
        ownerId: 1,
      });

      jest
        .spyOn(productService, 'hasProductNameAlreadyUsed')
        .mockResolvedValueOnce(false);

      const result = await productService.createProduct('TEST PRODUCT', 1);
      expect(prismaClientMock.customer.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });

      expect(result).toEqual({
        id: 1,
        name: 'TEST PRODUCT',
        ownerId: 1,
      });
    });

    it('should throw a BadRequestException if the product name is not provided', async () => {
      await expect(productService.createProduct('', 1)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw a BadRequestException if the product name is already used', async () => {
      jest
        .spyOn(productService, 'hasProductNameAlreadyUsed')
        .mockResolvedValueOnce(true);

      await expect(
        productService.createProduct('TEST PRODUCT', 1),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException if the owner ID is not provided', async () => {
      await expect(
        productService.createProduct('TEST PRODUCT', null),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw a BadRequestException if the owner does not exist', async () => {
      prismaClientMock.customer.findUnique.mockResolvedValueOnce(null);

      jest
        .spyOn(productService, 'hasProductNameAlreadyUsed')
        .mockResolvedValueOnce(false);

      await expect(
        productService.createProduct('TEST PRODUCT', 1),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('addAffiliateToProduct', () => {
    it('should throw BadRequestException when productId is not provided', async () => {
      const customerId = 1;
      await expect(
        productService.addAffiliateToProduct(undefined, customerId),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when customerId is not provided', async () => {
      await expect(
        productService.addAffiliateToProduct(1, undefined),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw BadRequestException when the customer does not exist', async () => {
      prismaClientMock.customer.findUnique.mockResolvedValueOnce(null);
      await expect(productService.addAffiliateToProduct(1, 1)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw BadRequestException when the product does not exist', async () => {
      prismaClientMock.customer.findUnique.mockResolvedValueOnce({
        id: 1,
        name: 'Bruno Oliveira',
      });
      prismaClientMock.product.findUnique.mockResolvedValueOnce(null);
      await expect(productService.addAffiliateToProduct(1, 1)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('should throw InternalServerErrorException when the product update fails', async () => {
      const productId = 1;
      const customerId = 2;
      const product = { id: productId, name: 'PRODUCT TEST', affiliates: [] };
      const customer = { id: customerId, name: 'Bruno Oliveira' };

      prismaClientMock.customer.findUnique.mockResolvedValueOnce(customer);
      prismaClientMock.product.findUnique.mockResolvedValueOnce(product);
      prismaClientMock.product.update.mockRejectedValueOnce(
        new InternalServerErrorException('error'),
      );
      await expect(
        productService.addAffiliateToProduct(productId, customerId),
      ).rejects.toThrow(InternalServerErrorException);
    });

    it('should update the product with the affiliate if everything is ok', async () => {
      const customerId = 1;
      const productId = 2;

      const customerMock = { id: customerId, name: 'Bruno Oliveira' };
      const productMock = {
        id: productId,
        name: 'PRODUCT TEST',
        affiliates: [],
      };

      prismaClientMock.customer.findUnique.mockResolvedValue(customerMock);
      prismaClientMock.product.findUnique.mockResolvedValue(productMock);
      prismaClientMock.product.update.mockResolvedValue(productMock);

      const result = await productService.addAffiliateToProduct(
        productId,
        customerId,
      );

      expect(prismaClientMock.product.update).toHaveBeenCalledWith({
        where: { id: productId },
        data: { affiliates: { connect: { id: customerId } } },
      });

      expect(result.message).toBe(
        `Adiciona o ${customerMock.name} como afiliado do produto "${productMock.name}"`,
      );
      expect(result.data.product).toEqual(productMock);
      expect(result.data.customer).toEqual(customerMock);
    });
  });
});
