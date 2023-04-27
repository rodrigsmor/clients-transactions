import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './common/guards';
import { CustomerController } from './customer/customer.controller';
import { CustomerService } from './customer/customer.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [AuthModule, PrismaModule, PrismaClient],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    CustomerService,
  ],
  controllers: [CustomerController],
})
export class AppModule {}
