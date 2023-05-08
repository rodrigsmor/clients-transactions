import Image from "next/image";
import TransactionDetailedType from "src/utils/@types/transaction.detailed";
import { convertFromCentavosToReais } from "src/utils/functions/currencyMethods"
import { formatDateTime } from "src/utils/functions/datetimeMethods";
import DEFAULT_PROFILE_PICTURE from '@images/DEFAULT_PROFILE_PICTURE.png';

export const TransactionsCard = ({ data: { id, type, value, date, product, customer }}: { data: TransactionDetailedType}) => {
  const dateTime = new Date(date);
  const productValue = convertFromCentavosToReais(value);
  
  return (
    <article className="flex items-center px-3 py-2 gap-2 overflow-hidden border-2 border-primary-main/20 rounded-xl bg-background-dark/40">
      <section className="order-2 flex-grow overflow-hidden">
        <h3 className="max-w-full truncate text-sm font-semibold text-typography-light/70">{ customer.name }</h3>
        <h4 className="max-w-full truncate text-sm font-bold text-typography-main/80" aria-roledescription="produto vendido"><span>{ product.name }</span></h4>
        <footer className="mt-[2px] flex justify-between items-end">
          <time dateTime={dateTime.toISOString()} className="text-sm font-regular text-typography-light/60">{ formatDateTime(dateTime) }</time>
          <data value={productValue.money} className='text-base font-semibold text-primary-main'>{productValue.formattedValue}</data>
        </footer>
      </section>
      <figure className="flex-shrink-0 min-w-fit order-1">
        <Image src={customer.profile_picture ?? DEFAULT_PROFILE_PICTURE} height={48} width={48} alt={`${customer.name} profile`} className="flex-shrink-0 min-w-11 w-11 h-11 max-h-11 max-w-11 object-cover rounded-full p-1 border-2 border-primary-main/20" />
      </figure>
    </article>
  )
}