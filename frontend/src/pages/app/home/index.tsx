import { TransactionsCard } from "@components/cards/transactionsCard";
import { Header } from "@components/layout/header";
import { Redirect } from "@components/textual/Redirect";
import Head from "next/head";
import { recentTransactions } from "src/utils/mock/transactions";

const Home = () => {
  return (
    <>
      <Head>
        <title>App - Home</title>
      </Head>
      <div className="w-screen h-screen min-h-fit max-w-screen overflow-hidden bg-background-main" aria-labelledby="header_PageTitle">
        <Header pageTitle="Início" name="home" />
        <main className="px-4 md:px-12 lg:px-16 pt-24 h-full w-full min-w-full lg:gap-12 lg:grid grid-cols-[2fr_minmax(340px,1fr)]">
          <section className="lg:col-start-1 lg:col-end-2">
          </section>
          <aside className="h-full flex flex-col gap-7 lg:col-start-2 lg:col-end-3 max-h-full overflow-hidden" aria-labelledby="recentTransactions_title">
            <header className="w-full flex items-center justify-between">
              <h2 id='recentTransactions_title' className="text-xl font-semibold text-typography-light/80">Últimas transações</h2>
              <Redirect path="/transactions" />
            </header>
            <ul className="w-full flex flex-col gap-5 h-full max-h-full overflow-y-auto pb-6 lg:pb-11 custom-scrollbar">
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