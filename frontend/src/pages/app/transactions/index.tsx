import { Header } from "@components/layout/header";
import Head from "next/head";
import { IoChevronBackSharp, IoChevronForwardSharp } from "react-icons/io5";
import { TransactionDetailedCard } from "@components/cards/transactionDetailedCard";
import { MouseEvent, useEffect, useState } from "react";
import TransactionDetailedType from "src/utils/@types/transaction.detailed";
import apiClient from "src/utils/config/api.client";
import { toast } from "react-hot-toast";
import Loading from "@components/layout/loading";
import { MdOutlineSupervisedUserCircle } from "react-icons/md";

export interface MetaType {
  hasNext: boolean;
  hasBefore: boolean;
  pageSize: number;
  currentPage: number;
  totalPages: number;
}


const Transactions = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pagination, setPagination] = useState<MetaType>({
    currentPage: 1,
    hasBefore: false,
    hasNext: false,
    pageSize: 10,
    totalPages: 0,
  });
  const [transactions, setTransactions] = useState<Array<TransactionDetailedType>>([]);

  useEffect(() => {
    async function getTransactions() {
      setIsLoading(true);

      apiClient.get(`/transactions?page=${currentPage}&pageSize=10`)
        .then(({ data }) => {
          setTransactions(data.data);
          setPagination(data.meta);
        })
        .catch((error) => {
          const { data } = error.response;
          toast.error(data.error.message);
        })
        .finally(() => setIsLoading(false));
    }

    getTransactions();
  }, [currentPage])

  return (
    <>
      <Head>
        <title>App - Transactions</title>
      </Head>
      <div className="w-screen h-screen min-h-fit max-w-screen overflow-x-hidden bg-background-main">
        <Header pageTitle="Transações" name="transactions" />
        <main className="max-w-full overflow-hidden pb-9 flex flex-col gap-6 px-4 md:px-12 lg:px-16 pt-24 h-fit w-full min-w-full">
          <header className="w-full flex items-center justify-between">
            <h2 className='text-xl text-typography-light font-semibold'>Transações dos seus clientes</h2>
          </header>
          <ul className="w-full min-w-full transition-all duration-300 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              isLoading ? (<li className="w-full col-start-1 col-end-4 h-full flex flex-col items-center justify-center gap-4"><Loading /></li>)
                : ((transactions && transactions.length > 0) ? transactions.map((transaction, index) => <li key={index}><TransactionDetailedCard data={transaction} /></li>)
                  : (
                    <li className="w-full col-start-1 col-end-4 h-full flex flex-col items-center justify-center gap-4">
                      <MdOutlineSupervisedUserCircle size={56} className="text-primary-main" />
                      <div className="flex flex-col gap-1 items-center">
                        <strong className="text-2xl text-center font-semibold text-typography-main">Sem transações</strong>
                        <p className="text-center text-typography-light/80 w-full font-medium">Aparentemente não há transações recentes</p>
                      </div>
                    </li>
                  )
                )
            }
          </ul>
          <footer className="w-full gap-5 flex items-center">
            <button onClick={e => setCurrentPage(currentPage - 1)} disabled={!pagination.hasBefore} className="text-background-main gap-2 font-medium flex-grow transition-all duration-300 [&:not(:disabled)]:hover:bg-primary-dark bg-primary-main disabled:bg-primary-main/40 h-11 flex items-center justify-center rounded-2xl">
              <IoChevronBackSharp size={24} />
              voltar
            </button>
            <p className="flex gap-2 text-typography-light/60 [&>strong]:text-typography-light/80">
              <strong>{pagination.currentPage}</strong> de <strong>{pagination.totalPages}</strong>
            </p>
            <button onClick={e => setCurrentPage(currentPage + 1)} disabled={!pagination.hasNext} className="text-background-main gap-2 font-medium flex-grow transition-all duration-300 [&:not(:disabled)]:hover:bg-primary-dark bg-primary-main disabled:bg-primary-main/40 h-11 flex items-center justify-center rounded-2xl">
              próximo
              <IoChevronForwardSharp size={24} />
            </button>
          </footer>
        </main>
      </div>
    </>
  );
}

export default Transactions;