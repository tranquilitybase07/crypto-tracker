const API_URL = "https://api.coingecko.com/api/v3/coins/markets";
const API_PARAMS =
  "?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=false";
let comparisonList = [];
let coinData = [];

async function fetchCryptos() {
  try {
    const response = await fetch(`${API_URL}${API_PARAMS}`);
    if (!response.ok) throw new Error("Failed to fetch data");
    const data = await response.json();
    coinData = data;
    populateCryptoList(data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateCryptoList(data) {
  const tbody = document.getElementById("crypto-tbody");
  tbody.innerHTML = data
    .map(
      (crypto) => `
      <tr>
      <td><img src="${crypto.image}" alt="${crypto.name}" class="w-8 h-8"></td>
      <td>${crypto.name}</td>
      <td>${crypto.symbol.toUpperCase()}</td>
      <td>$${crypto.current_price.toLocaleString()}</td>
      <td class="${
        crypto.price_change_percentage_24h >= 0
          ? "text-green-400"
          : "text-red-400"
      }">
        ${crypto.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td>$${crypto.market_cap.toLocaleString()}</td>
      <td>
        <button class="add-btn bg-accent text-white px-2 py-1 rounded" data-id="${
          crypto.id
        }" 
                data-name="${crypto.name}" 
                data-symbol="${crypto.symbol.toUpperCase()}"
                data-price="${crypto.current_price}" 
                data-image="${crypto.image}" 
                data-change="${crypto.price_change_percentage_24h}">
          Add
        </button>
      </td>
    </tr>
  `
    )
    .join("");
}

function handleAddToComparison(event) {
  const id = event.target.getAttribute("data-id");
  if (!id || comparisonList.includes(id)) return;

  if (comparisonList.length < 5) {
    comparisonList.push(id);
    localStorage.setItem("comparisonList", JSON.stringify(comparisonList));
    renderComparisonSection();
  } else {
    alert("You can only compare up to 5 cryptocurrencies.");
  }
}

function renderComparisonSection() {
  const section = document.getElementById("comparison");
  section.classList.remove("hidden");

  const listDiv = document.getElementById("comparison-list");
  listDiv.innerHTML = comparisonList
    .map((id) => {
      const coin = coinData.find((cx) => cx.id === id);

      return `
        <div class="bg-slate-900 p-4 rounded shadow text-center">
        <img src="${coin.image}" alt="${
        coin.name
      }" class="w-16 h-16 mx-auto mb-2">
        <h3 class="text-lg font-bold">${coin.name} (${coin.symbol})</h3>
        <p>Price: $${coin.current_price.toLocaleString()}</p>
        <p class="${
          coin.price_change_percentage_24h >= 0
            ? "text-green-400"
            : "text-red-400"
        }">
          Change: ${coin.price_change_percentage_24h.toFixed(2)}%
        </p>
        <button class="remove-btn bg-red-500 text-white px-2 py-1 rounded mt-2" data-id="${
          coin.id
        }">Remove</button>
      </div>
        `;
    })
    .join("");
}

function handleRemoveFromComparison(event) {
  const id = event.target.getAttribute("data-id");
  comparisonList = comparisonList.filter((cryptoId) => cryptoId !== id);
  localStorage.setItem("comparisonList", JSON.stringify(comparisonList));
  renderComparisonSection();
}

function sortCryptosByMarketCap() {
  const tbody = document.getElementById("crypto-tbody");
  const rows = Array.from(tbody.rows);

  rows.sort((a, b) => {
    const marketCapA = parseInt(a.cells[4].innerText.replace(/\D/g, ""), 10);
    const marketCapB = parseInt(b.cells[4].innerText.replace(/\D/g, ""), 10);
    return marketCapB - marketCapA;
  });

  tbody.innerHTML = "";
  rows.forEach((row) => tbody.appendChild(row));
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetchCryptos();

  document.getElementById("crypto-tbody").addEventListener("click", (event) => {
    if (event.target.classList.contains("add-btn")) {
      handleAddToComparison(event);
    }
  });

  document
    .getElementById("comparison-list")
    .addEventListener("click", (event) => {
      if (event.target.classList.contains("remove-btn")) {
        handleRemoveFromComparison(event);
      }
    });

  document
    .getElementById("sort-by-market-cap")
    .addEventListener("click", sortCryptosByMarketCap);

  const savedComparison =
    JSON.parse(localStorage.getItem("comparisonList")) || [];
  comparisonList = savedComparison;
  renderComparisonSection();
});
