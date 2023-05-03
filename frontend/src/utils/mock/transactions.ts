import { TransactionCardProps } from "@components/cards/transactionsCard";
import TransactionsEnum from "../enums/transactionsEnum";

export const recentTransactions: Array<TransactionCardProps> = [
  {
    id: 1,
    type: TransactionsEnum.COMMISSION_RECEIVED,
    value: 9999,
    product: {
      id: 1,
      name: 'DESENVOLVIMENTO DE SOFTWARE PARA COMPLETOS INICIANTES',
    },
    date: new Date('2023-04-30T14:30:00.000Z'),
    customer: {
      id: 1,
      name: 'Juliana Carolina Pereira de Oliveira',
      profile_picture: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
  },
  {
    id: 2,
    type: TransactionsEnum.COMMISSION_PAID,
    value: 3499,
    product: {
      id: 2,
      name: 'COMUNICAÇÃO INTERPESSOAL: DESENVOLVA SUAS HABILIDADES',
    },
    date: new Date('2023-04-29T09:45:00.000Z'),
    customer: {
      id: 2,
      name: 'Alexandre Gabriel Souza e Silva',
      profile_picture: 'https://images.unsplash.com/photo-1527082395-e939b847da0d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OTN8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
  },
  {
    id: 3,
    type: TransactionsEnum.PRODUCER_SALES,
    value: 899,
    product: {
      id: 3,
      name: 'TESTES UNITÁRIOS: MELHORES PRÁTICAS',
    },
    date: new Date('2023-04-28T18:15:00.000Z'),
    customer: {
      id: 3,
      name: 'Gabriela Cristina da Costa Barros',
      profile_picture: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80',
    },
  },
  {
    id: 4,
    type: TransactionsEnum.COMMISSION_PAID,
    value: 2499,
    product: {
      id: 4,
      name: 'TUDO O QUE VOCÊ PRECISA SABER SOBRE DOCKER',
    },
    date: new Date('2023-04-27T12:00:00.000Z'),
    customer: {
      id: 4,
      name: 'Thiago Henrique de Souza e Silva',
      profile_picture: 'https://images.unsplash.com/photo-1611403119860-57c4937ef987?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzJ8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
  },
  {
    id: 5,
    type: TransactionsEnum.AFFILIATE_SALES,
    value: 4999,
    product: {
      id: 5,
      name: 'Programação: Um curso',
    },
    date: new Date('2023-04-26T15:30:00.000Z'),
    customer: {
      id: 5,
      name: 'Rafaela Beatriz Almeida Rodrigues',
      profile_picture: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTB8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
  },
  {
    id: 6,
    type: TransactionsEnum.COMMISSION_PAID,
    value: 12384,
    product: {
      id: 4,
      name: 'Como desenvolver suas Soft Skills',
    },
    date: new Date('2023-04-27T12:00:00.000Z'),
    customer: {
      id: 4,
      name: 'Larissa Vitória Santos Ferreira',
      profile_picture: 'https://images.unsplash.com/photo-1542596594-649edbc13630?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzV8fHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
  },
  {
    id: 7,
    type: TransactionsEnum.AFFILIATE_SALES,
    value: 172929,
    product: {
      id: 5,
      name: 'CURSO INTENSIVO DE JAVASCRIPT COM NEXT.JS',
    },
    date: new Date('2023-04-26T15:30:00.000Z'),
    customer: {
      id: 5,
      name: 'Guilherme Henrique da Silva Santos',
      profile_picture: 'https://images.unsplash.com/photo-1542327897-d73f4005b533?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    },
  },
]