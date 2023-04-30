interface CurrencyConvertionReturn {
  money: number;
  formattedValue: string;
}

export function convertFromCentavosToReais(centavos: number): CurrencyConvertionReturn {
  const reais = centavos / 100;
  const formattedValue = reais.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return { money: reais, formattedValue };
}