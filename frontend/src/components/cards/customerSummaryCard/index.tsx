import Image from "next/image";
import CustomerSummaryType from "src/utils/@types/customer.summary";
import { convertFromCentavosToReais } from "src/utils/functions/currencyMethods";

export const CustomerSummaryCard = ({ data: {balance_amount, email, id, name, profile_picture} }: { data: CustomerSummaryType }) => {
  const balanceAmountFormatted = convertFromCentavosToReais(balance_amount);

  return (
    <article className="w-36 min-w-36 flex items-center flex-col">
      <figure className='w-full grid gap-2 place-items-center max-w-full overflow-hidden'>
        <Image src={profile_picture} height={78} width={78} alt={`${name} profile`} className="w-14 h-14 object-cover rounded-full p-1 border-[2px] border-primary-main/20" />
        <figcaption className="w-full text-base font-medium text-typography-light/80 max-w-full text-center truncate">{ name }</figcaption>
      </figure>
      <data value={balanceAmountFormatted.money} className="text-[13px] font-bold text-primary-main w-full text-center">{ balanceAmountFormatted.formattedValue }</data>
    </article>
  );
}