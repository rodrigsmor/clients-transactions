import { CtaButton } from "@components/buttons/ctaButton";
import { ImageInput } from "@components/forms/imageInput";
import { InputForm } from "@components/forms/inputForm";
import { Header } from "@components/layout/header";
import { AxiosError } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState, MouseEvent, ChangeEvent, FormEvent, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { BsBoxFill } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { HiUserCircle } from "react-icons/hi";
import apiClient from "src/utils/config/api.client";

interface ProducstType {
  name: string;
  wasCreated: boolean;
  hasAlreadyBeenSent: boolean;
}

const CustomerForm = () => {
  const router = useRouter();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [ customerId, setCustomerId ] = useState<number | undefined>();
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const [products, setProducts] = useState<Array<ProducstType>>([{ name: '', hasAlreadyBeenSent: false, wasCreated: false, }]);

  const handleAddProduct = (event: MouseEvent<HTMLButtonElement>) => {
    const nonEmptyValues = products.filter(({ name }) => name !== '');
    const newProducts = [...nonEmptyValues, { hasAlreadyBeenSent: false, wasCreated: false, name: '' }]

    setProducts(newProducts);
  }

  const handleProductChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newProducts = [...products];
    newProducts[index].name = event.target.value;
    setProducts(newProducts);
  }

  useEffect(() => {
    const allProductsWereCreated = products.every(({ wasCreated }) => wasCreated === true);
    if (customerId && allProductsWereCreated) {
      router.push('/app/customers');
    }
  }, [customerId, products, router]);

  const createNewCustomer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (email === '' || !emailRegex.test(email)) return toast.error('Precisa ser um e-mail válido!');
    if (name === '') return toast.error('O nome é um campo obrigatório');

    setIsLoading(true);
    let customerCreatedId: boolean | null = null;

    if(!customerId) {
      await apiClient.post('/customer', { name, email, profilePicture })
        .then(({ data }) => {
          toast.success(data.message);
  
          const { data: { id } } = data;
          
          if(id) {
            setCustomerId(id)
            customerCreatedId = id;
          };
        })
        .catch(({ response: { data } }) => {
          toast.error(data.error.message);
        });
    }

    if (customerId || customerCreatedId) {
      const updatedProducts = await Promise.all(
        products.map(async ({ name, wasCreated, hasAlreadyBeenSent }, index) => {
          if (name !== '' && !wasCreated) {
            try {
              const { data } = await apiClient.post('/product', { name, ownerId: customerId ? customerId : customerCreatedId });
              toast.success(`Produto "${name}" foi criado com sucesso!`);
              return { hasAlreadyBeenSent: true, wasCreated: true, name };
            } catch ({ response: { data } }: any) {
              toast.error(`Erro ao criar produto "${name}": ${data.error.message}`);
              return { hasAlreadyBeenSent: true, wasCreated: false, name };
            }
          } else {
            return { hasAlreadyBeenSent, wasCreated, name };
          }
        })
      );

      setProducts(updatedProducts);
    }
    setIsLoading(false)
  }

  const productsHasAlreadyBeenSent = products.some(({ hasAlreadyBeenSent }) => hasAlreadyBeenSent === true)

  return (
    <>
      <Head>
        <title>App - New customer</title>
      </Head>
      <div className="w-screen h-screen max-w-screen overflow-x-hidden bg-background-main">
        <Header pageTitle="Novo cliente" name="newCustomer" />
        <main className="w-full px-4 md:px-12 lg:px-16 pt-24 h-fit lg:h-full min-w-full mb-9">
          <form onSubmit={createNewCustomer} className="w-full flex flex-col gap-8 lg:flex-row lg:flex-wrap">
            <section className="flex-grow h-fit max-h-fit p-4 rounded-xl bg-primary-light border-2 border-primary-main/20">
              <fieldset className="w-full max-w-full overflow-hidden flex flex-col gap-6">
                <legend className="text-lg flex items-center gap-2 md:text-xl mb-4 font-semibold text-typography-light/80">
                  <HiUserCircle size={20} className='text-primary-main' />
                  Informações do cliente
                </legend>
                <div className='w-full max-w-full flex flex-col gap-4 mb-4'>
                  <div className="w-full grid place-items-center lg:place-items-start">
                    <ImageInput setImage={setProfilePicture} image={profilePicture} />
                  </div>
                  <InputForm className="[&>input]:!bg-primary-main/5" isFormik={false} isReadOnly={false} label="Nome do cliente" name="customerName" placeholder="Informe o nome do cliente" props={{ value: name, maxLength: 20, onChange: e => setName(e.target.value) }} />
                  <InputForm className="[&>input]:!bg-primary-main/5" isFormik={false} isReadOnly={false} type="email" label="E-mail do cliente" name="customerEmail" placeholder="Informe o email do cliente" props={{ value: email, onChange: e => setEmail(e.target.value) }} />
                </div>
              </fieldset>
            </section>
            <section className="w-full lg:w-[36%] h-fit max-h-fit flex-shrink-0 p-4 rounded-xl bg-secondary-light border-2 border-secondary-main/20">
              <fieldset className="w-full max-w-full overflow-hidden flex flex-col gap-6">
                <legend className="text-lg h-fit flex items-center gap-2 md:text-xl mb-4 font-semibold text-typography-light/80">
                  <BsBoxFill size={18} className='text-secondary-main' />
                  Produtos
                </legend>
                <div className="w-full max-w-full overflow-hidden flex gap-3 flex-col">
                  {
                    products.map(({ name, wasCreated }, index) => (
                      <InputForm
                        key={index}
                        isFormik={false}
                        isReadOnly={wasCreated}
                        label={`Produto - ${index + 1}`}
                        name={`productName-${index}`}
                        isSecondary
                        placeholder="Informe o nome do produto"
                        props={{ maxLength: 30, value: name, onChange: (event) => handleProductChange(index, event) }}
                      />
                    )
                    )
                  }
                </div>
                <button onClick={handleAddProduct} type='button' disabled={productsHasAlreadyBeenSent} className='flex items-center font-medium gap-2 justify-center w-full py-2 px-3 text-secondary-main bg-secondary-main/5 hover:bg-secondary-main/10 disabled:bg-secondary-main/5 rounded-lg transition-all ease-out duration-300 disabled:opacity-75'>
                  <FiPlus size={18} /> adicionar produto
                </button>
              </fieldset>
            </section>
            <footer className="w-full basis-full flex lg:justify-end lg:mb-12">
              <CtaButton props={{ disabled: isLoading }} label="salvar informações" type="submit" className="w-full lg:w-fit lg:!px-16" />
            </footer>
          </form>
        </main>
      </div>
    </>
  );
}

export default CustomerForm;