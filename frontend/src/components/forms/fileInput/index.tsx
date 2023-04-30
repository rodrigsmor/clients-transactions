import Image from "next/image";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";

type FileInputType = {
  onChange: (file: File | null) => void;
}

export const FileInput = ({ onChange }: FileInputType) => {
  const [ previewFile, setPreviewFile ] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if(file) {
      const reader = new FileReader();
      reader.readAsText(file);

      reader.onload = () => {
        setPreviewFile(reader.result as string);
      }
    }

    onChange(file);
  }

  return (
    <fieldset className="w-full p-6 grid place-items-center bg-primary-main/5 rounded-xl border-2 border-primary-main/20 relative focus-within:border-primary-main/60 transition-all ease-out duration-300">
      <label htmlFor="" className="w-full flex flex-col items-center gap-3 text-sm md:text-lg font-medium text-primary-main">
        <FiUploadCloud size={34} className="text-primary-main" />
        Enviar arquivo de transações
      </label>
      <input type="file" onChange={handleFileChange} className=" w-full h-full absolute opacity-0" />
      <figure className='w-full h-11 border-2 max-h-11 max-w-full overflow-hidden grid place-items-center border-primary-main/20 mt-6 rounded-xl bg-primary-light'>
        <p className={`text-xs font-medium text-primary-dark ${(previewFile) && 'hidden'}`}>Nenhum arquivo foi selecionado</p>
        <pre className="bg-background-main text-typography-light w-full px-3 text-sm relative brightness-90">{ previewFile}</pre>
      </figure>
    </fieldset>
  );
}