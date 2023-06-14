const API =
  "https://v6.exchangerate-api.com/v6/0b2abca5d4b1235f21d95cb2/latest/";

const APIpair =
  "https://v6.exchangerate-api.com/v6/0b2abca5d4b1235f21d95cb2/pair/";

let currency;
let currencyPair;

const getCurrency = async (selectObject) => {
  const resolve = await fetch(API + selectObject.value);
  currency = await resolve.json();

  loadCurrency(currency, selectObject);
};

const loadCurrency = (currency) => {
  console.log(currency.base_code);
  const kgs = document.querySelector("#kgs");
  kgs.innerHTML = currency.conversion_rates.KGS;

  const dollar = document.querySelector("#dollar");
  dollar.innerHTML = currency.conversion_rates.USD;

  const euro = document.querySelector("#euro");
  euro.innerHTML = currency.conversion_rates.EUR;

  const yuan = document.querySelector("#yuan");
  yuan.innerHTML = currency.conversion_rates.CNY;

  const tenge = document.querySelector("#tenge");
  tenge.innerHTML = currency.conversion_rates.KZT;

  const rubble = document.querySelector("#rubble");
  rubble.innerHTML = currency.conversion_rates.RUB;
};

const getPairCurrency = async (event) => {
  event.preventDefault();
  const from = document.querySelector("#from");
  const to = document.querySelector("#to");

  const resolve = await fetch(`${APIpair}${from.value}/${to.value}`);

  currencyPair = await resolve.json();
  console.log("currencyPair: ", currencyPair);

  Calculate();
};

const Calculate = () => {
  const amount = document.querySelector("#amount");
  console.log("amount: ", amount.value);
  console.log("rate: ", currencyPair.conversion_rate);

  const result = document.querySelector("#result");

  const res = +amount.value * currencyPair.conversion_rate;
  console.log("res: ", res);
  result.innerHTML = `${res}`;
};
