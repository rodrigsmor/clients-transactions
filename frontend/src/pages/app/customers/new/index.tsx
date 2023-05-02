import { CtaButton } from "@components/buttons/ctaButton";
import { InputForm } from "@components/forms/inputForm";
import { Header } from "@components/layout/header";
import Head from "next/head";
import { useState, MouseEvent, ChangeEvent } from 'react';
import { BsBoxFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { HiUserCircle } from "react-icons/hi";

const CustomerForm = () => {
  const [ name, setName ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const [ products, setProducts ] = useState<Array<string>>(['']);

  const handleAddProduct = (event: MouseEvent<HTMLButtonElement>) => {
    let newProducts = [...products, ''];

    newProducts = newProducts.filter((value, index) => {
      if(index === 0) return true;
      return value !== '';
    });

    setProducts(newProducts);
  }

  const handleProductChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newProducts = [...products];
    newProducts[index] = event.target.value;
    setProducts(newProducts);
  }

  return (
    <>
      <Head>
        <title>App - New customer</title>
      </Head>
      <div className="w-screen h-screen max-w-screen overflow-x-hidden bg-background-main">
        <Header pageTitle="Novo cliente" name="newCustomer" />
        <main className="w-full px-4 md:px-12 lg:px-16 pt-24 h-fit lg:h-full min-w-full mb-9">
          <form className="w-full flex flex-col gap-8 lg:flex-row lg:flex-wrap">
            <section className="flex-grow h-fit max-h-fit p-4 rounded-xl bg-primary-light border-2 border-primary-main/20">
              <fieldset className="w-full max-w-full overflow-hidden flex flex-col gap-6">
                <legend className="text-lg flex items-center gap-2 md:text-xl mb-4 font-semibold text-typography-light/80">
                  <HiUserCircle size={20} className='text-primary-main' />
                  Informações do cliente
                </legend>
                <div className='w-full max-w-full flex flex-col gap-4 mb-4'>
                  <InputForm className="[&>input]:!bg-primary-main/5" isFormik={false} isReadOnly={false} label="Nome do cliente" name="customerName" placeholder="Informe o nome do cliente" props={{ value: name, maxLength: 20, onChange: e => setName(e.target.value) }} />
                  <InputForm className="[&>input]:!bg-primary-main/5" isFormik={false} isReadOnly={false} label="E-mail do cliente" name="customerEmail" placeholder="Informe o email do cliente" props={{ value: email, onChange: e => setEmail(e.target.value) }} />
                </div>
              </fieldset>
            </section>
            <section className="w-full lg:w-[36%] flex-shrink-0 p-4 rounded-xl bg-secondary-light border-2 border-secondary-main/20">
              <fieldset className="w-full max-w-full overflow-hidden flex flex-col gap-6">
                <legend className="text-lg h-fit flex items-center gap-2 md:text-xl mb-4 font-semibold text-typography-light/80">
                  <BsBoxFill size={18} className='text-secondary-main' />
                  Produtos
                </legend>
                <div className="w-full max-w-full overflow-hidden flex gap-3 flex-col">
                  {
                    products.map((value, index) => (
                      <InputForm
                        key={index}
                        isFormik={false}
                        isReadOnly={false}
                        label={`Produto - ${index + 1}`}
                        name={`productName-${index}`}
                        isSecondary
                        placeholder="Informe o nome do produto"
                        props={{ maxLength: 30, value, onChange: (event) => handleProductChange(index, event) }}
                      />
                      )
                    )
                  }
                </div>
                <button onClick={handleAddProduct} type='button' className='flex items-center font-medium gap-2 justify-center w-full py-2 px-3 text-secondary-main bg-secondary-main/5 hover:bg-secondary-main/10 rounded-lg transition-all ease-out duration-300'>
                  <FiPlus size={18} /> adicionar produto
                </button>
              </fieldset>
            </section>
            <footer className="w-full basis-full flex lg:justify-end lg:mb-12">
              <CtaButton label="salvar informações" type="submit" className="w-full lg:w-fit lg:!px-16" />
            </footer>
          </form>
        </main>
      </div>
    </>
  );
}

export default CustomerForm;