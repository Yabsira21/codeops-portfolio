const API_URL = "https://api.frankfurter.dev/v2";

let currencies = [];
let rates = {};
let watchlist = JSON.parse(localStorage.getItem("birrWatchlist")) || [];

// ==============================
// ELEMENTS
// ==============================

const status = document.querySelector("#status");
const quickRates = document.querySelector("#quick-rates");
const currencySelect = document.querySelector("#currency");
const convertForm = document.querySelector("#convert-form");
const amountInput = document.querySelector("#amount");
const result = document.querySelector("#result");
const watchlistContainer = document.querySelector("#watchlist");
const refreshBtn = document.querySelector("#refresh-btn");

// ==============================
// STATUS
// ==============================

function showStatus(message, type = "") {
  status.textContent = message;
  status.className = `status ${type}`;
}

// ==============================
// LOAD CURRENCIES
// ==============================

async function loadCurrencies() {
  currencySelect.innerHTML = `
        <option value="">Loading currencies...</option>
    `;

  try {
    const response = await fetch(`${API_URL}/currencies`);

    if (!response.ok) {
      throw new Error("Failed to load currencies.");
    }

    const data = await response.json();

    // Frankfurter v2 returns an array
    currencies = data;

    renderCurrencies();
  } catch (error) {
    currencySelect.innerHTML = `
            <option value="">
                Unable to load currencies
            </option>
        `;

    throw error;
  }
}

// ==============================
// RENDER CURRENCY OPTIONS
// ==============================

function renderCurrencies() {
  currencySelect.innerHTML = `
        <option value="">Select a currency</option>
    `;

  currencies
    .sort((a, b) => a.iso_code.localeCompare(b.iso_code))
    .forEach(function (currency) {
      // Don't show ETB as a conversion option
      if (currency.iso_code === "ETB") {
        return;
      }

      const option = document.createElement("option");

      option.value = currency.iso_code;

      option.textContent = `${currency.iso_code} — ${currency.name}`;

      currencySelect.appendChild(option);
    });
}

// ==============================
// LOAD ETB RATES
// ==============================

async function loadRates() {
  showStatus("Loading latest ETB rates...", "loading");

  try {
    const response = await fetch(`${API_URL}/rates?base=ETB`);

    if (!response.ok) {
      throw new Error("Failed to load exchange rates.");
    }

    const data = await response.json();

    /*
            API response:

            [
                {
                    date: "2026-08-22",
                    base: "ETB",
                    quote: "USD",
                    rate: 0.0065
                }
            ]
        */

    rates = {};

    data.forEach(function (item) {
      rates[item.quote] = item.rate;
    });

    showStatus("Latest ETB rates", "success");

    renderQuickRates();
  } catch (error) {
    console.error(error);

    showStatus("Unable to load exchange rates. Please try again.", "error");

    throw error;
  }
}

// ==============================
// QUICK RATES
// ==============================

function renderQuickRates() {
  // Currencies we want to show at the top
  const popularCurrencies = ["USD", "EUR", "GBP", "AED", "SAR"];

  quickRates.innerHTML = "";

  popularCurrencies.forEach(function (currency) {
    const rate = rates[currency];

    // Skip if API doesn't provide the rate
    if (!rate) {
      return;
    }

    const item = document.createElement("div");

    item.className = "quick-rate";

    item.innerHTML = `
            <strong>${currency}</strong>

            <span>
                ${rate.toFixed(6)}
            </span>

            <small>
                1 ETB
            </small>
        `;

    quickRates.appendChild(item);
  });
}

// ==============================
// CONVERT CURRENCY
// ==============================

function convertCurrency(amount, currency) {
  const rate = rates[currency];

  if (!rate) {
    throw new Error("Exchange rate is unavailable.");
  }

  return amount * rate;
}

// ==============================
// CONVERSION FORM
// ==============================

convertForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const amount = Number(amountInput.value);

  const currency = currencySelect.value;

  // --------------------------
  // Validate amount
  // --------------------------

  if (!amount || amount <= 0) {
    result.innerHTML = `
                <p class="error">
                    Please enter a valid amount.
                </p>
            `;

    return;
  }

  // --------------------------
  // Validate currency
  // --------------------------

  if (!currency) {
    result.innerHTML = `
                <p class="error">
                    Please select a currency.
                </p>
            `;

    return;
  }

  // --------------------------
  // Conversion
  // --------------------------

  try {
    result.innerHTML = `
                <p class="loading">
                    Converting...
                </p>
            `;

    const convertedAmount = convertCurrency(amount, currency);

    const rate = rates[currency];

    const formattedAmount = convertedAmount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    result.innerHTML = `
                <div class="result-content">

                    <p class="result-label">
                        Conversion result
                    </p>

                    <h3>
                        ${amount.toLocaleString()} ETB
                        =
                        ${formattedAmount}
                        ${currency}
                    </h3>

                    <p class="rate">
                        1 ETB =
                        ${rate.toFixed(6)}
                        ${currency}
                    </p>

                    <button
                        type="button"
                        class="watch-btn"
                        data-currency="${currency}"
                    >
                        ${
                          watchlist.includes(currency)
                            ? "✓ In Watchlist"
                            : "☆ Add to Watchlist"
                        }
                    </button>

                </div>
            `;
  } catch (error) {
    console.error(error);

    result.innerHTML = `
                <p class="error">
                    Unable to convert currency.
                    Please try again.
                </p>
            `;
  }
});

// ==============================
// SAVE WATCHLIST
// ==============================

function saveWatchlist() {
  localStorage.setItem("birrWatchlist", JSON.stringify(watchlist));
}

// ==============================
// ADD TO WATCHLIST
// ==============================

function addToWatchlist(currency) {
  if (watchlist.includes(currency)) {
    return;
  }

  watchlist.push(currency);

  saveWatchlist();

  renderWatchlist();
}

// ==============================
// REMOVE FROM WATCHLIST
// ==============================

function removeFromWatchlist(currency) {
  watchlist = watchlist.filter(function (item) {
    return item !== currency;
  });

  saveWatchlist();

  renderWatchlist();
}

// ==============================
// RENDER WATCHLIST
// ==============================

function renderWatchlist() {
  // Empty state
  if (watchlist.length === 0) {
    watchlistContainer.innerHTML = `
            <p class="empty">
                Your watchlist is empty.
            </p>
        `;

    return;
  }

  watchlistContainer.innerHTML = "";

  watchlist.forEach(function (currency) {
    const rate = rates[currency];

    const currencyInfo = currencies.find(function (item) {
      return item.iso_code === currency;
    });

    const item = document.createElement("div");

    item.className = "watch-item";

    item.innerHTML = `
            <div class="watch-info">

                <strong>
                    ${currency}
                </strong>

                <span>
                    ${currencyInfo?.name || "Currency"}
                </span>

            </div>


            <div class="watch-rate">

                ${
                  rate
                    ? `1 ETB = ${rate.toFixed(6)} ${currency}`
                    : "Rate unavailable"
                }

            </div>


            <button
                type="button"
                class="remove-btn"
                data-currency="${currency}"
            >
                Remove
            </button>
        `;

    watchlistContainer.appendChild(item);
  });
}

// ==============================
// ADD / REMOVE WATCHLIST BUTTON
// ==============================

result.addEventListener("click", function (event) {
  const button = event.target.closest(".watch-btn");

  if (!button) {
    return;
  }

  const currency = button.dataset.currency;

  if (watchlist.includes(currency)) {
    removeFromWatchlist(currency);

    button.textContent = "☆ Add to Watchlist";
  } else {
    addToWatchlist(currency);

    button.textContent = "✓ In Watchlist";
  }
});

// ==============================
// REMOVE WATCHLIST ITEM
// ==============================

watchlistContainer.addEventListener("click", function (event) {
  const button = event.target.closest(".remove-btn");

  if (!button) {
    return;
  }

  const currency = button.dataset.currency;

  removeFromWatchlist(currency);
});

// ==============================
// REFRESH RATES
// ==============================

refreshBtn.addEventListener("click", async function () {
  refreshBtn.disabled = true;

  refreshBtn.textContent = "Refreshing...";

  try {
    await loadRates();

    renderWatchlist();
  } catch (error) {
    console.error(error);

    showStatus("Unable to refresh rates.", "error");
  } finally {
    refreshBtn.disabled = false;

    refreshBtn.textContent = "Refresh Rates";
  }
});

// ==============================
// INITIALIZE APP
// ==============================

async function init() {
  try {
    showStatus("Loading currencies...", "loading");

    await loadCurrencies();

    await loadRates();

    renderWatchlist();
  } catch (error) {
    console.error(error);

    showStatus("Unable to load Birr Watch. Please try again.", "error");

    currencySelect.innerHTML = `
            <option value="">
                Unable to load currencies
            </option>
        `;
  }
}

// ==============================
// START APP
// ==============================

init();
