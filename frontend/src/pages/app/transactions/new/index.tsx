import { TransactionFieldset } from "@components/cards/transactionFieldset";
import { FileInput } from "@components/forms/fileInput";
import { Header } from "@components/layout/header";
import { AxiosError } from "axios";
import _ from "lodash";
import Head from "next/head";
import { useRouter } from "next/router";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsFileRichtext } from "react-icons/bs";
import { ImFilesEmpty } from "react-icons/im";
import TransactionType from "src/utils/@types/transaction";
import apiClient from "src/utils/config/api.client";
import AppContext from "src/utils/context/appContext";

const TransactionNew = () => {
  const router = useRouter();
  const { setCustomersId } = useContext(AppContext);
  const [file, setFile] = useState<File | null>(null);
  const [transactions, setTransactions] = useState<Array<TransactionType>>([]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (transactions.length <= 0) return !toast.error('você precisa de no minimo uma transação.');

    let customersId: number[] = [];

    try {
      const requests = transactions.map(transaction => apiClient.post('/transactions', transaction));
      const responses = await Promise.all(requests);

      responses.forEach(response => {
        const sellerId = response?.data?.data?.customers?.seller?.id;
        const producerId = response?.data?.data?.customers?.producer?.id;

        if (sellerId) {
          customersId.push(sellerId);
        }

        if (producerId) {
          customersId.push(producerId);
        }
      });

      setCustomersId(new Set(customersId));
      toast.success('As transações foram salvas com êxito!');
      router.push('/app/transactions');
    } catch (error) {
      const { response } = error as AxiosError;
      const { data }: any = response;
      toast.error(`Error ao salvar transação: ${data?.error?.message}`);
    }
  }

  return (
    <>
      <Head>
        <title>App - New transaction</title>
      </Head>
      <div className='w-screen h-screen max-w-screen overflow-x-hidden bg-background-main relative'>
        <Header name="newTransaction" pageTitle="Novas transações" />
        <main className="w-full h-full px-4 md:px-12 lg:px-16 pt-24">
          <section className="w-full max-w-full ">
            <form onSubmit={onSubmit} className="flex w-full max-w-full overflow-hidden gap-4 flex-col h-fit pb-6 lg:pb-12">
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
                          <ImFilesEmpty size={38} className="text-secondary-main" />
                          <p className="font-medium text-base text-typography-light/60">Nenhum dado foi enviado ainda</p>
                        </div>
                      )
                    }
                    {(transactions && transactions.length >= 1) && transactions.map((transaction, index) => <TransactionFieldset index={index} key={index} data={transaction} />)}
                  </ol>
                </div>
              </section>
              <footer className='w-full flex justify-end'>
                <button type='submit' disabled={(transactions.length <= 0)} className="w-full disabled:opacity-70 hover:disabled:bg-primary-main bg-primary-main text-background-main lg:w-1/3 font-semibold flex items-center justify-center text-center h-11 rounded-xl transition-all  hover:bg-primary-dark mt-3">
                  Salvar transações
                </button>
              </footer>
            </form>
          </section>
        </main>
      </div>
    </>
  )
}

export default TransactionNew;