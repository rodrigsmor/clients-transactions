import { TransactionsCard } from "@components/cards/transactionsCard";
import { Header } from "@components/layout/header";
import { FormLink } from "@components/textual/formLink";
import { Redirect } from "@components/textual/redirect";
import Head from "next/head";
import { HiUserAdd } from "react-icons/hi";
import { BsFileTextFill } from 'react-icons/bs'
import { RiUploadCloud2Fill } from "react-icons/ri";
import { CustomerSummaryCard } from "@components/cards/customerSummaryCard";
import { useContext, useEffect, useState, } from "react";
import apiClient from "src/utils/config/api.client";
import { toast } from "react-hot-toast";
import AppContext from "src/utils/context/appContext";
import TransactionDetailedType from "src/utils/@types/transaction.detailed";
import { TbMoodEmpty } from "react-icons/tb";
import Loading from "@components/layout/loading";
import CustomerSummaryType from "src/utils/@types/customer.summary";
import { MdOutlineSupervisedUserCircle } from "react-icons/md";

interface RequestsLoadingType {
  isCustomersLoading: boolean;
  isTransactionsLoading: boolean;
}

const Home = () => {
  const { user } = useContext(AppContext);
  const [isCustomersLoading, setIsCustomersLoading] = useState<boolean>(true);
  const [isTransactionsLoading, setIsTransactionsLoading] = useState<boolean>(true);

  const [customers, setCustomers] = useState<Array<CustomerSummaryType>>([]);
  const [transactions, setTransactions] = useState<Array<TransactionDetailedType>>([]);

  useEffect(() => {
    async function fetchTransactions() {
      apiClient.get('/transactions')
        .then(({ data }) => {
          setTransactions(data.data);
        })
        .catch((error) => {
          const { data } = error.response;
          toast.error(data.error.message);
        })
        .finally(() => setIsCustomersLoading(false))
    }

    async function fetchCustomers() {
      apiClient.get('/customer/recents')
        .then(({ data }) => {
          setCustomers(data);
          console.log(data)
        })
        .catch((error) => {
          const { data } = error.response;
          toast.error(data.error.message);
          console.log(error)
        })
        .finally(() => setIsTransactionsLoading(false))
    }

    fetchTransactions();
    fetchCustomers();
  }, [])

  return (
    <>
      <Head>
        <title>App - Home</title>
      </Head>
      <div className="w-screen h-screen min-h-fit max-w-screen overflow-x-hidden lg:overflow-hidden bg-background-main" aria-labelledby="header_PageTitle">
        <Header pageTitle="Visão geral" name="home" />
        <main className="px-4 md:px-12 lg:px-16 pt-24 h-fit lg:h-full w-full min-w-full flex flex-col gap-5 lg:gap-12 lg:grid grid-cols-[2fr_minmax(340px,1fr)]">
          <div className="lg:col-start-1 lg:col-end-2 flex flex-col gap-7 overflow-hidden">
            <header className="w-full max-w-full flex flex-col gap-7 overflow-hidden">
              <div className="w-full max-w-full overflow-hidden">
                <h2 className='text-2xl font-semibold max-w-full'>Bem-vindo de volta, <span className="font-extrabold text-primary-main">{user?.name.split(' ')[0]}</span>!</h2>
                <p className="text-lg text-typography-main/60 font-medium">O que deseja fazer agora?</p>
              </div>
              <div className="w-full flex flex-col lg:flex-row  [&>a]:flex-grow gap-4">
                <FormLink name='transaction' Icon={<RiUploadCloud2Fill />} caption="Novidades? Adicione-as agora." label="Adicionar transações" path="/app/transactions/new" />
                <FormLink name='customer' Icon={<HiUserAdd />} caption="Adicione novos clientes ao seu negócio." label="Criar novo cliente" path="/app/customers/new" />
                <FormLink name='see-transactions' Icon={<BsFileTextFill />} caption="Confira as atividades de seus clientes." label="Ver transações" path="/app/transactions" />
              </div>
            </header>
            <section className="w-full max-w-full overflow-hidden flex flex-col gap-5">
              <header className="w-full flex items-center justify-between">
                <h3 id='recentTransactions_title' className="text-xl font-semibold text-typography-light/80">Seus clientes</h3>
              </header>
              <ul className="flex w-full max-w-full overflow-y-hidden overflow-x-auto gap-3 custom-scrollbar horizontal">
                {
                  isCustomersLoading ? (<li className="w-full h-full flex items-center justify-center"><Loading /></li>)
                    : (
                      (customers && customers?.length > 0) ? (customers.map((customer) => <li key={customer.id}><CustomerSummaryCard data={customer} /></li>))
                        : (
                          <li className="w-full h-full flex items-center justify-center flex-col gap-4">
                            <MdOutlineSupervisedUserCircle size={48} className="text-primary-main" />
                            <div className="flex flex-col gap-1 items-center">
                              <strong className="text-2xl text-center font-semibold text-typography-main">Sem clientes</strong>
                              <p className="text-center text-typography-light/80 w-full font-medium">Você não possui clientes ainda</p>
                            </div>
                          </li>
                        )
                    )
                }
              </ul>
            </section>
          </div>
          <aside className="h-fit lg:h-full flex flex-col gap-7 lg:col-start-2 lg:col-end-3 lg:max-h-full lg:overflow-hidden" aria-labelledby="recentTransactions_title">
            <header className="w-full flex items-center justify-between">
              <h3 id='recentTransactions_title' className="text-xl font-semibold text-typography-light/80">Últimas transações</h3>
              <Redirect path="/app/transactions" />
            </header>
            <ul className="w-full h-fit flex flex-col gap-5 lg:h-full lg:max-h-full lg:overflow-y-auto pb-6 lg:pb-11 custom-scrollbar">
              {
                isTransactionsLoading ? (<li className="w-full h-full flex items-center justify-center"><Loading /></li>)
                  : ((transactions && transactions.length > 0) ? (transactions.map(transaction => <li key={transaction.id}><TransactionsCard data={transaction} /></li>))
                    : (
                      <li className="w-full h-full gap-7 flex items-center justify-center flex-col">
                        <TbMoodEmpty size={64} className='text-primary-main/80' />
                        <div className="flex flex-col gap-1 items-center">
                          <strong className="text-2xl text-center font-semibold text-typography-main">Sem transações</strong>
                          <p className="text-center text-typography-light/80 w-full font-medium">Aparentemente não há transações recentes</p>
                        </div>
                      </li>
                    ))
              }
            </ul>
          </aside>
        </main>
      </div>
    </>
  );
}

export default Home;