async function fetchPrice(symbol = 'ZIL_THB') {
  const res = await fetch(`https://api.bitkub.com/api/market/ticker?sym=${symbol}`);
  const data = await res.json();
  return data[symbol];
}

function notify(message) {
  fetch(config.LINE_NOTIFY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${config.LINE_TOKEN}`,
    },
    body: `message=${message}`
  });
}

async function updateApp() {
  const priceData = await fetchPrice();
  const mockData = Array(30).fill(priceData.last);
  const rsi = getRSI(mockData);
  const macd = getMACD(mockData);
  const signals = { rsi, macd };

  if (rsi < 30 || macd.cross === 'golden') {
    notify("📉 Buy signal from RSI/MACD");
  }
  drawBubble(priceData);
  updateInfoPanel(signals, priceData);
}

function updateInfoPanel(signals, priceData) {
  const panel = document.getElementById('infoPanel');
  panel.innerHTML = `
    <h3>ZIL/THB: ${priceData.last}</h3>
    <p>RSI: ${signals.rsi.toFixed(2)}</p>
    <p>MACD: ${signals.macd.macd.toFixed(2)} (${signals.macd.cross})</p>
  `;
}

updateApp();
setInterval(updateApp, 60000);