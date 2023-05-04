import TransactionsEnum from "../enums/transactionsEnum";

export default interface TransactionDetailedType {
  id: number;
  type: 'PRODUCER_SALES' | 'AFFILIATE_SALES' | 'COMMISSION_PAID' | 'COMMISSION_RECEIVED';
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
}