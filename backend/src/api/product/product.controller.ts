import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/createProductDto';
import { ProductService } from './product.service';
import { ResponseDto } from 'src/utils/dto/responseDto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(@Body() data: CreateProductDto): Promise<ResponseDto> {
    return this.productService.createProduct(data.name, data.ownerId);
  }
}
