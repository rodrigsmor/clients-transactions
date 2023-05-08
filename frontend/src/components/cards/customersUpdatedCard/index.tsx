import Image from "next/image"
import DEFAULT_PROFILE_PICTURE from '@images/DEFAULT_PROFILE_PICTURE.png';
import { CustomerUpdatedType } from "src/utils/@types/customer.updated"
import { convertFromCentavosToReais } from "src/utils/functions/currencyMethods";

export const CustomersUpdatedCard = ({ data }: { data: CustomerUpdatedType }) => {
  const productValue = convertFromCentavosToReais(data.balance_amount);

  
  return (
    <article className="w-full flex flex-col gap-4 items-center max-w-full lg:max-w-[30%] lg:min-w-[30%] p-3 rounded-2xl border-2 border-secondary-main/10 bg-secondary-main/5">
      <figure className="flex-shrink-0 min-w-fit">
        <Image src={data.profile_picture ?? DEFAULT_PROFILE_PICTURE} height={48} width={48} alt={`${data.name} profile`} className="flex-shrink-0 min-w-11 w-11 h-11 max-h-11 max-w-11 object-cover rounded-full p-1 border-2 border-secondary-main/20" />
      </figure>
      <section className="flex-grow flex flex-col overflow-hidden">
        <h3 className="w-full max-w-full truncate text-xs text-center font-semibold text-typography-light/70">{ data.name }</h3>
        <data value={productValue.money} className='text-lg text-center font-semibold text-secondary-main'>{productValue.formattedValue}</data>
      </section>
    </article>
  )
}