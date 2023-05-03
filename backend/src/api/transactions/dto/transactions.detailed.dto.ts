import { Customer, Product, Transaction } from '@prisma/client';

export class TransactionsDetailedDto {
  id: number;
  type: string;
  product: {
    id: number;
    name: string;
  };
  customer: {
    id: number;
    name: string;
    email: string;
    profile_picture: string;
  };
  date: Date;
  value: number;

  constructor(
    transaction: Transaction & {
      product: Product;
      customer: Customer;
    },
  ) {
    this.id = transaction.id;
    this.date = transaction.date;
    this.type = transaction.type;
    this.value = transaction.value;
    this.product = {
      id: transaction.product.id,
      name: transaction.product.name,
    };
    this.customer = {
      id: transaction.customer.id,
      name: transaction.customer.name,
      email: transaction.customer.email,
      profile_picture: transaction.customer.profile_picture,
    };
  }
}
