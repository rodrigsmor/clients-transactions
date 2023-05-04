export default interface TransactionDetailedType {
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
}