import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards';
import { CustomerController } from './api/customer/customer.controller';
import { CustomerService } from './api/customer/customer.service';
import { PrismaClient } from '@prisma/client';
import { ProductController } from './api/product/product.controller';
import { ProductService } from './api/product/product.service';
import { TransactionsController } from './api/transactions/transactions.controller';
import { TransactionsService } from './api/transactions/transactions.service';
import { CustomValidationPipe } from './utils/filters/custom.validation.pipe';

@Module({
  imports: [AuthModule, PrismaModule, PrismaClient],
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    CustomerService,
    ProductService,
    TransactionsService,
  ],
  controllers: [CustomerController, ProductController, TransactionsController],
})
export class AppModule {}
