const prompt = require('prompt-sync')();


function iniciar_programa_conversao() {
  console.log('Programa de conversão de moedas');

  while(true) {
     const { moeda_inicial, moeda_final, valor } = coletar_dados_usuario();

  const resultado = converter_moeda(moeda_inicial, moeda_final, valor);
    console.log('Resultado da Conversão:');
    console.log(resultado);

  historicoConversoes.adicionarConversao(resultado);
    
  let opcao;
  do {
  opcao = prompt('Digite "nova" para fazer outra conversão ou "histórico" para ver o histórico: ').toLowerCase().trim();
    if (opcao === 'historico') {
     console.log('Histórico:');
     console.log(obterHistorico().join('\n'));
  opcao = prompt('Digite "nova" para fazer outra conversão ou "histórico" para ver o histórico: ').toLowerCase().trim();
  } else if (opcao !== 'nova') {
    console.log('Opção inválida. Tente novamente.');
  }
} while (opcao !== 'nova' && opcao !== 'historico');

  if (opcao === 'historico') {
   continue;
} else if (opcao === 'nova') {
   continue;
   }
 }
}

function coletar_dados_usuario() {
  const moedas = ['EURO', 'DOLAR', 'REAL', 'LIBRA'];
  let moeda_inicial = '';
  let moeda_final = '';
  let valor = 0;

  console.log('Escolha a moeda inicial:');
  moeda_inicial = listarMoedas();

  console.log('Escolha a moeda final:');
  moeda_final = listarMoedas();

  do {
    valor = parseFloat(prompt('Digite o valor a ser convertido: '));

    if (isNaN(valor) || valor <= 0) {
      console.log('Valor inválido');
      valor = 0;
    }
  } while (valor == 0);

  return {
    moeda_inicial,
    moeda_final,
    valor,
  };
}

//Adicionar a list comprehension - Laiza S. Fernandes
//Deve listar as moedas numeradas e solicitar que o usuário escolhao núm correspondente a moeda que deseja converter

function listarMoedas() {
  const moedas = ['EURO', 'DOLAR', 'REAL', 'LIBRA'];
  const listaFormatada = moedas.map((moeda, index) => `${index + 1} - ${moeda}`);
  console.log('Moedas disponíveis:\n' + listaFormatada.join('\n'));

  //Loop que solicita a moeda e verifica se a escolha é válida
  let escolha;
  do {
    escolha = parseInt(prompt('Escolha o número da moeda: '));

    if (isNaN(escolha)) {
      console.log('Por favor, insira um número válido.');
    } else if (escolha < 1 || escolha > moedas.length) {
      console.log(`Por favor, insira um número entre 1 e ${moedas.length}.`);
    } 
  } while (isNaN(escolha) || escolha < 1 || escolha > moedas.length);

  return moedas[escolha - 1]; //Retorna a moeda
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

//Lizandra Raquel da Silva Assunção
//criação da função closure para exibir o historico das 2 ultimas conversões.
//Ao realizar mais de 2 conversões, a primeira conversão feita é removida dando lugar a uma nova conversão.

const criarHistoricoConversoes = () => {
  let historico = [];
const adicionarConversao = (resultado) => {
    historico.unshift(resultado);
    if (historico.length >2) {
      historico.pop();
    }
  };
const mostrarHistorico = () => historico;
  return { adicionarConversao, mostrarHistorico};
};
const historicoConversoes = criarHistoricoConversoes();
  const obterHistorico = () => historicoConversoes.mostrarHistorico();

const resultado = iniciar_programa_conversao(); console.log(resultado)
