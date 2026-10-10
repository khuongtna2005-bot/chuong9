import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';

@Controller('api/products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Get()
  getProducts() {
    return this.productService.getAllProducts();
  }

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return {
      message: 'Dữ liệu hợp lệ, đã nhận sản phẩm',
      data: dto,
    };
  }

  @Get(':id')
  getProductById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }
}