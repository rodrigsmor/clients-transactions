import { Customer, Product } from '@prisma/client';
import { TransactionsDto } from 'src/api/transactions/dto';
import { PrismaService } from 'src/prisma/prisma.service';

interface UpdateCustomersAccountBalanceTypes {
  seller: Customer;
  producer?: Customer;
}

export async function updateCustomersAccountBalance(
  transaction: TransactionsDto,
  customer: Customer,
  product: Product,
): Promise<UpdateCustomersAccountBalanceTypes> {
  const prisma = new PrismaService();
  let updatedAccountBalance = 0;
  const isToUpdateProducerBalance: boolean = transaction.type === 2;

  if (isToUpdateProducerBalance) {
    const owner = await prisma.customer.findUnique({
      where: { id: product.ownerId },
    });

    updatedAccountBalance = owner.balance_amount.toNumber() + transaction.value;
  } else if (transaction.type === 3) {
    updatedAccountBalance =
      customer.balance_amount.toNumber() - transaction.value;
  } else {
    updatedAccountBalance =
      customer.balance_amount.toNumber() + transaction.value;
  }

  const customerUpdated = await prisma.customer.update({
    where: { id: isToUpdateProducerBalance ? product.ownerId : customer.id },
    data: { balance_amount: updatedAccountBalance },
  });

  return isToUpdateProducerBalance
    ? {
        producer: customerUpdated,
        seller: customer,
      }
    : {
        seller: customerUpdated,
      };
}
