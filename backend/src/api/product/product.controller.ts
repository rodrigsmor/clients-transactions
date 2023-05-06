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
import { AddAffiliateDto } from './dto/addAffiliateDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/ProductDto';
import { ProductResponseDto } from './dto/ProductResponseDto';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    description: 'Creates a new product by user id',
  })
  @ApiResponse({
    type: ProductDto,
  })
  async createProduct(@Body() data: CreateProductDto): Promise<ProductDto> {
    return this.productService.createProduct(data.name, data.ownerId);
  }

  @Put('/affiliate/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description:
      'This route adds an affiliate to a product. In other words, it turns a customer into an affiliate of a product, thus allowing to sell a product and earn a commission for the sale.',
  })
  @ApiResponse({
    type: ProductResponseDto,
    description: 'It will return the customer and product updateds',
  })
  async addAffiliateToProduct(
    @Body() data: AddAffiliateDto,
  ): Promise<ProductResponseDto> {
    return this.productService.addAffiliateToProduct(
      data.productId,
      data.customerId,
    );
  }
}
