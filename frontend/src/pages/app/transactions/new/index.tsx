import { FileInput } from "@components/forms/fileInput";
import { Header } from "@components/layout/header";
import Head from "next/head";
import { useState } from "react";
import { BsFileRichtext } from "react-icons/bs";

const TransactionNew = () => {
  const [ file, setFile ] = useState<File | null>(null);



  return (
    <>
      <Head>
       <title>App - New transaction</title>
      </Head>
      <div className='w-screen h-screen bg-background-main relative'>
        <Header name="newTransaction" pageTitle="Novas transações" />
        <main className="w-full h-full px-4 md:px-12 lg:px-16 pt-24">
          <section>
            <form className="flex gap-4 flex-col">
              <h2 className="text-2xl text-typography-main font-bold mb-5 w-full">Transação</h2>
              <div>
                <FileInput onChange={setFile} />
              </div>
              <div className="w-full px-4 py-4 rounded-xl bg-secondary-dark/5 border-2 border-secondary-main/20">
                <fieldset className="w-full">
                  <legend className="flex gap-2 items-center text-lg font-semibold text-typography-light/80 box-border">
                    <BsFileRichtext size={18} className="text-secondary-main flex-shrink-0" />
                    Informações da transação
                  </legend>
                </fieldset>
              </div>
            </form>
          </section>
        </main>
      </div>
    </>
  )
}

export default TransactionNew;