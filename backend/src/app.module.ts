import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards';
import { CustomerController } from './api/customer/customer.controller';
import { CustomerService } from './api/customer/customer.service';
import { PrismaClient } from '@prisma/client';
import { ProductController } from './api/product/product.controller';
import { ProductService } from './api/product/product.service';

@Module({
  imports: [AuthModule, PrismaModule, PrismaClient],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    CustomerService,
    ProductService,
  ],
  controllers: [CustomerController, ProductController],
})
export class AppModule {}
