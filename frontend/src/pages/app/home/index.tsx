import { TransactionsCard } from "@components/cards/transactionsCard";
import { Header } from "@components/layout/header";
import { FormLink } from "@components/textual/formLink";
import { Redirect } from "@components/textual/redirect";
import Head from "next/head";
import { HiUserAdd } from "react-icons/hi";
import { BsFileTextFill } from 'react-icons/bs'
import { RiUploadCloud2Fill } from "react-icons/ri";
import { recentTransactions } from "src/utils/mock/transactions";
import { customerSummary } from "src/utils/mock/customerSummary";
import { CustomerSummaryCard } from "@components/cards/customerSummaryCard";

const Home = () => {
  return (
    <>
      <Head>
        <title>App - Home</title>
      </Head>
      <div className="w-screen h-screen min-h-fit max-w-screen lg:overflow-hidden bg-background-main" aria-labelledby="header_PageTitle">
        <Header pageTitle="Visão geral" name="home" />
        <main className="px-4 md:px-12 lg:px-16 pt-24 h-fit lg:h-full w-full min-w-full flex flex-col gap-5 lg:gap-12 lg:grid grid-cols-[2fr_minmax(340px,1fr)]">
          <div className="lg:col-start-1 lg:col-end-2 flex flex-col gap-7 overflow-hidden">
            <header className="w-full max-w-full flex flex-col gap-7 overflow-hidden">
              <div className="w-full max-w-full overflow-hidden">
                <h2 className='text-2xl font-semibold max-w-full'>Bem-vindo de volta, <span className="font-extrabold text-primary-main">Rodrigo</span>!</h2>
                <p className="text-lg text-typography-main/60 font-medium">O que deseja fazer agora?</p>
              </div>
              <div className="w-full flex flex-col lg:flex-row  [&>a]:flex-grow gap-4">
                <FormLink name='transaction' Icon={<RiUploadCloud2Fill />} caption="Novidades? Adicione-as agora." label="Adicionar transações" path="/app/transactions/new" />
                <FormLink name='customer' Icon={<HiUserAdd />} caption="Adicione novos clientes ao seu negócio." label="Criar novo cliente" path="/app/transactions/new" />
                <FormLink name='see-transactions' Icon={<BsFileTextFill />} caption="Confira as atividades de seus clientes." label="Ver transações" path="/app/transactions" />
              </div>
            </header>
            <section className="w-full max-w-full overflow-hidden flex flex-col gap-5">
              <header className="w-full flex items-center justify-between">
                <h3 id='recentTransactions_title' className="text-xl font-semibold text-typography-light/80">Seus clientes</h3>
              </header>
              <ul className="flex w-full max-w-full overflow-y-hidden overflow-x-auto gap-3 custom-scrollbar horizontal">
                {
                  customerSummary.map((customer) => <li key={customer.id}><CustomerSummaryCard data={customer} /></li>)
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
                recentTransactions.map(transaction => <li key={transaction.id}><TransactionsCard data={transaction} /></li>)
              }
            </ul>
          </aside>
        </main>
      </div>
    </>
  );
}

export default Home;