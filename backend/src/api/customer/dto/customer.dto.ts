import { Customer, Product } from '@prisma/client';

export class CustomerDto {
  id: number;
  name: string;
  balance_amount: number;
  profile_picture: string;
  number_of_products: number;

  constructor(customer: Customer & { products: Product[] }) {
    this.id = customer.id;
    this.name = customer.name;
    this.balance_amount = customer.balance_amount as unknown as number;
    this.profile_picture = customer.profile_picture;
    this.number_of_products = customer.products.length;
  }
}
