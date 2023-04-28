import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProductDto } from './dto/createProductDto';
import { ProductService } from './product.service';
import { ResponseDto } from 'src/utils/dto/responseDto';
import { AddAffiliateDto } from './dto/addAffiliateDto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() data: CreateProductDto): Promise<ResponseDto> {
    return this.productService.createProduct(data.name, data.ownerId);
  }

  @Put('/affiliate/')
  @HttpCode(HttpStatus.OK)
  async addAffiliateToProduct(@Body() data: AddAffiliateDto) {
    return this.productService.addAffiliateToProduct(
      data.productId,
      data.customerId,
    );
  }
}
