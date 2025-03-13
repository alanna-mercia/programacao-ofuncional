const prompt = require('prompt-sync')();

function iniciar_programa_conversao() {
  console.log('Programa de conversão de moedas');
  const { moeda_incial, moeda_final, valor } = coletar_dados_usuario();

  //pegar o retorno da convesão e criar uma função para exibir o resultado onde pode ser aplicado a List Comprehension
 return converter_moeda(moeda_incial, moeda_final, valor);
}

function coletar_dados_usuario() {
  const moedas = ['EURO', 'DOLAR', 'REAL', 'LIBRA'];
  let moeda_incial = '';
  let moeda_final = '';
  let valor = 0;

  do {
    moeda_incial = prompt(`Escolha a moeda inicial: ${moedas.join(', ')}: `);

    if (!moedas.includes(moeda_incial.toUpperCase())) {
      console.log('Moeda inválida');
    }
  } while (!moedas.includes(moeda_incial.toUpperCase()));

  do {
    moeda_final = prompt(`Escolha a moeda final: ${moedas.join(', ')}: `);

    if (!moedas.includes(moeda_final.toUpperCase())) {
      console.log('Moeda inválida');
    }
  } while (!moedas.includes(moeda_final.toUpperCase()));

  do {
    valor = parseFloat(prompt('Digite o valor a ser convertido: '));

    if (isNaN(valor) || valor <= 0) {
      console.log('Valor inválido');
      valor = 0;
    }
  } while (valor == 0);

  return {
    moeda_incial,
    moeda_final,
    valor,
  };
}

function obter_taxa_cambio(moedaInicial, moedaFinal) {
  const taxasMockadas = {
    EURO: { DOLAR: 1.08, REAL: 5.5, LIBRA: 0.85 },
    DOLAR: { EURO: 0.93, REAL: 5.1, LIBRA: 0.78 },
    REAL: { EURO: 0.18, DOLAR: 0.2, LIBRA: 0.15 },
    LIBRA: { EURO: 1.18, DOLAR: 1.28, REAL: 6.8 },
  };

  return () => {
    if (moedaInicial.toUpperCase() === moedaFinal.toUpperCase()) return 1;
    return (
      taxasMockadas[moedaInicial.toUpperCase()]?.[moedaFinal.toUpperCase()] ||
      null
    );
  };
}

function converter_moeda(moedaInicial, moedaFinal, valor) {
  //Função de alta ordem, para obter a taxa de câmbio - jonas
  const obterTaxa = obter_taxa_cambio(moedaInicial, moedaFinal);
  const taxa = obterTaxa();

  if (taxa === null) {
    console.log('Conversão não disponível para essas moedas.');
    return;
  }

  const valorConvertido = valor * taxa;

  // (Função lambda) - Alanna Mércia
 // (Função lambda) - Alanna Mércia
 const formatarResultado = (
  valor,
  moedaInicial,
  valorConvertido,
  moedaFinal
) =>
  `Resultado: ${valor.toFixed(
    2
  )} ${moedaInicial} equivale a ${valorConvertido.toFixed(2)} ${moedaFinal}`;

return formatarResultado(valor, moedaInicial, valorConvertido, moedaFinal);
}

const resultado = iniciar_programa_conversao();
console.log(resultado)
