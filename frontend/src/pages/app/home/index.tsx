import { Header } from "@components/layout/header";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>App - Home</title>
      </Head>
      <div className="bg-background-main">
        <Header pageTitle="Início" name="home" />
      </div>
    </>
  );
}

export default Home;