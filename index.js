const currencyFirstEl = document.getElementById("currency-first");

const worthFirstEl = document.getElementById("worth-first");

const currencySecondEl = document.getElementById("currency-second");

const worthSecondEl = document.getElementById("worth-second");

const exchangeRateEl = document.getElementById("exchange-rate");

updateRate()

function updateRate() {
  const from = currencyFirstEl.value;
  const to = currencySecondEl.value;
  const amount = parseFloat(worthFirstEl.value) || 1;

  fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`)
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      const rate = data.rates[to];
      exchangeRateEl.innerText = `1 ${from} = ${(rate / amount).toFixed(4)} ${to}`;
      worthSecondEl.value = rate.toFixed(2);
    })
    .catch((err) => {
      exchangeRateEl.innerText = "Error: " + err.message;
      console.error(err);
    });
}
currencyFirstEl.addEventListener("change", updateRate);

currencySecondEl.addEventListener("change", updateRate);

worthFirstEl.addEventListener("input", updateRate);