import { TransactionFieldset } from "@components/cards/transactionFieldset";
import { FileInput } from "@components/forms/fileInput";
import { Header } from "@components/layout/header";
import Head from "next/head";
import { useState } from "react";
import { BsFileRichtext } from "react-icons/bs";
import { ImFilesEmpty } from "react-icons/im";
import TransactionType from "src/utils/@types/transaction";

const TransactionNew = () => {
  const [ file, setFile ] = useState<File | null>(null);
  const [ transactions, setTransactions ] = useState<Array<TransactionType> | null>([]);

  return (
    <>
      <Head>
       <title>App - New transaction</title>
      </Head>
      <div className='w-screen h-screen max-w-screen overflow-x-hidden bg-background-main relative'>
        <Header name="newTransaction" pageTitle="Novas transações" />
        <main className="w-full h-full px-4 md:px-12 lg:px-16 pt-24">
          <section className="w-full max-w-full ">
            <form className="flex w-full max-w-full overflow-hidden gap-4 flex-col h-fit pb-6 lg:pb-12">
              <h2 className="text-2xl text-typography-main font-bold mb-5 w-full">Transação</h2>
              <section className="w-full max-w-full overflow-hidden flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-[52.7%]">
                  <FileInput onChange={setFile} setTransactions={setTransactions} />
                </div>
                <div className="w-full max-w-full overflow-hidden flex flex-col px-4 py-4 gap-5 rounded-xl bg-secondary-dark/5 border-2 border-secondary-main/20">
                  <fieldset className="w-full">
                    <legend className="flex gap-2 items-center text-lg font-semibold text-typography-light/80 box-border">
                      <BsFileRichtext size={18} className="text-secondary-main flex-shrink-0" />
                      Informações das transações
                    </legend>
                  </fieldset>
                  <ol className="w-full !max-w-full overflow-hidden flex flex-col gap-2 transition-all duration-300 ease-out">
                    {
                      (!transactions || transactions?.length < 1) && (
                        <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                          <ImFilesEmpty size={38} className="text-secondary-main"/>
                          <p className="font-medium text-base text-typography-light/60">Nenhum dado foi enviado ainda</p>
                        </div>
                      )
                    }
                    { (transactions && transactions.length >= 1) && transactions.map((transaction, index) => <TransactionFieldset index={index} key={index} data={transaction} />) }
                  </ol>
                </div>
              </section>
            </form>
          </section>
        </main>
      </div>
    </>
  )
}

export default TransactionNew;