import Image from "next/image";
import TransactionDetailedType from "src/utils/@types/transaction.detailed";
import TransactionsEnum from "src/utils/enums/transactionsEnum";
import DEFAULT_PROFILE_PICTURE from '@images/DEFAULT_PROFILE_PICTURE.png';
import { convertFromCentavosToReais } from "src/utils/functions/currencyMethods";
import { formatDateTime } from "src/utils/functions/datetimeMethods";
import { useEffect } from "react";

export const TransactionDetailedCard = ({ data: { type, date, value, customer, product } }: { data: TransactionDetailedType }) => {
  const dateTime = new Date(date);
  const productValue = convertFromCentavosToReais(value);

  return (
    <article className="w-full p-3 flex flex-col bg-primary-main/5 border-2 border-primary-main/10 gap-2 rounded-xl">
      <header className="w-full max-w-full overflow-hidden flex gap-3 items-center">
        <figure className="flex-shrink-0 min-w-fit">
          <Image src={customer.profile_picture ?? DEFAULT_PROFILE_PICTURE} height={48} width={48} alt={`${customer.name} profile`} className="flex-shrink-0 min-w-11 w-11 h-11 max-h-11 max-w-11 object-cover rounded-full p-1 border-2 border-primary-main/20" />
        </figure>
        <div className="max-w-full flex gap-1 flex-col overflow-hidden">
          <p className="px-3 py-[2px] text-secondary-main text-xs bg-secondary-main/10 rounded-md font-medium w-fit">{TransactionsEnum[type]}</p>
          <h3 className="w-full max-w-full truncate text-sm font-semibold text-typography-light/70">{customer.name}</h3>
        </div>
      </header>
      <div className="w-full max-w-full overflow-hidden">
        <h4 className="max-w-full truncate text-base font-bold text-typography-main/80" aria-roledescription="produto vendido"><span>{product.name}</span></h4>
      </div>
      <footer className="w-full flex justify-between items-end">
        <time dateTime={dateTime.toISOString()} className="text-sm font-regular text-typography-light/60">{formatDateTime(dateTime)}</time>
        <data value={productValue.money} className='text-base font-semibold text-primary-main'>{productValue.formattedValue}</data>
      </footer>
    </article>
  );
}