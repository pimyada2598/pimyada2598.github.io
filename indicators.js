function getRSI(data) {
  return Math.random() * 100;
}

function getMACD(data) {
  return {
    macd: 1.2 + Math.random(),
    signal: 1.1 + Math.random(),
    cross: Math.random() > 0.5 ? 'golden' : 'death'
  };
}