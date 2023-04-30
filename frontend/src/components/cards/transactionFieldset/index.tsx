import { InputForm } from '@components/forms/inputForm';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import TransactionType from "src/utils/@types/transaction"
import TransactionsEnum from 'src/utils/enums/transactionsEnum';
import { convertFromCentavosToReais } from 'src/utils/functions/currencyMethods';
import { formatDateTime } from 'src/utils/functions/datetimeMethods';

export const TransactionFieldset = ({ data: { date, product, seller, type, value }, index }: { data: TransactionType, index: number }) => {
  const [ isExpanded, setIsExpanded ] = useState<boolean>(false);

  const valueConverted = convertFromCentavosToReais(value);

  const typeString = Object.values(TransactionsEnum)[type - 1] as string;

  return (
    <article className="w-full max-w-full overflow-hidden">
      <header className="w-full gap-3 flex items-center max-w-full overflow-hidden px-4 py-2 rounded-xl bg-secondary-main/5 border-2 border-secondary-main/20">
        <h5 className="font-extrabold text-xl flex-shrink-0 text-secondary-main">{ index+1 }</h5>
        <div className="flex-grow overflow-hidden">
          <p className="w-full max-w-full overflow-hidden truncate font-semibold text-typography-light/80 text-sm">{ seller }</p>
          <p className="w-full max-w-full overflow-hidden truncate font-medium text-typography-main/60 text-xs">{ typeString }</p>
        </div>
        <button onClick={() => setIsExpanded(!isExpanded)} type="button" className="flex-shrink-0 h-11 w-11 rounded-lg transition-all ease-out duration-300 hover:bg-secondary-main/10 grid place-items-center">
          <IoIosArrowDown size={24} className={`text-secondary-dark transition-all ease-out duration-300 ${isExpanded && '-rotate-180'}`} />
        </button>
      </header>
      <div className={`w-full transition-all flex gap-4 ease-out duration-300 ${isExpanded && 'expanded'} h-0 [&.expanded]:h-[408px] overflow-hidden pt-3 pl-3 lg:pl-5`}>
        <span className='w-[1px] h-full bg-typography-light/10'></span>
        <div className='w-full flex flex-col gap-3 pt-5'>
          <InputForm isReadOnly label='Nome do vendedor' name='seller-transaction' placeholder='Vendedor' type='text' value={seller} isSecondary />
          <InputForm isReadOnly label='Produto' name='product-transaction' placeholder='produto' type='text' value={product} isSecondary />
          <InputForm isReadOnly label='Valor da transação' name='value-transaction' placeholder='valor' type='string' value={valueConverted.formattedValue} isSecondary />
          <InputForm isReadOnly label='Data do produto' name='datetime-transaction' placeholder='Data da transação' type='text' value={formatDateTime(date)} isSecondary />
        </div>
      </div>
    </article>
  )
}