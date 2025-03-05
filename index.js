//CRIAÇAO FUNÇÃO LAMBDA//

const areaRetangulo = (base,altura) => base*altura
console.log(areaRetangulo(7,25))


//CRIAÇÃO LIST COMPREHENSION//
const taxasDeCambio = {
    USD: 5.81, //1 dólar
    EUR: 6.36, //1 euro
    GBP: 7.47, //1 libra esterlina
    JPY: 0.036 //1 iene japonês
};

const converterValores = (valores, moeda) => {
    if(!taxasDeCambio[moeda]) {
        throw new Error('Opa! A moeda ${moeda} não é suportada.');
    }

    return valores.map(valor => ({
        valorOriginal: valor,
        convertido: valor * taxasDeCambio[moeda],
        moedaDestino: moeda
    }));
};

const valores = [10, 25, 50];
const moeda = ["USD", "EUR", "GBP", "JYP"];
const resultados = moeda.flatmap(moeda => converterValores(valores, moeda));

console.log(resultados);