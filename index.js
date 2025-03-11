const prompt = require('prompt-sync')();

function iniciar_programa_conversao() {
  console.log('Programa de conversão de moedas');
  const { moeda_incial, moeda_final, valor } = coletar_dados_usuario();
  console.log(`Convertendo ${valor} de ${moeda_incial} para ${moeda_final}...`);
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

iniciar_programa_conversao();
