import Image from "next/image";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import TransactionType from "src/utils/@types/transaction";

type FileInputType = {
  onChange: (file: File | null) => void;
  setTransactions: (transactions: Array<TransactionType>) => void;
}

export const FileInput = ({ onChange, setTransactions }: FileInputType) => {
  const [ previewFile, setPreviewFile ] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if(file) {
      const reader = new FileReader();

      reader.readAsText(file);

      reader.onload = () => {
        const content = reader.result as string;

        setPreviewFile(content);

        const rows = content.split('\n').filter(value => value !== '');
        const parsedData = rows.map((row) => {
          return ({
            type: parseInt(row.slice(0, 1)),
            date: new Date(row.slice(1, 26)),
            product: row.slice(26, 56),
            value: parseInt(row.slice(56, 66)),
            seller: row.slice(66, row.length - 1),
          } as TransactionType)
        })

        setTransactions(parsedData);
      }
    }

    onChange(file);
  }

  return (
    <fieldset className="w-full p-6 grid place-items-center bg-primary-main/5 rounded-xl border-2 border-primary-main/20 relative focus-within:border-primary-main/60 transition-all ease-out duration-300">
      <label htmlFor="fileInput" className="w-full flex flex-col items-center text-center gap-3 text-sm md:text-lg font-medium text-primary-main">
        <FiUploadCloud size={34} className="text-primary-main" />
        Enviar arquivo de transações
      </label>
      <input id="fileInput" type="file" onChange={handleFileChange} className=" w-full h-full absolute opacity-0" />
      <figure className='w-full h-11 border-2 max-h-11 max-w-full overflow-hidden grid place-items-center border-primary-main/20 mt-6 rounded-xl bg-primary-light'>
        <p className={`text-xs font-medium text-primary-dark text-center ${(previewFile) && 'hidden'}`}>Nenhum arquivo foi selecionado</p>
        {previewFile && <pre className="bg-background-main text-typography-light w-full px-3 text-sm relative brightness-90">{ previewFile}</pre>}
      </figure>
    </fieldset>
  );
}