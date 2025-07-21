function drawBubble(priceData) {
  const canvas = document.getElementById('bubbleChart');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.8;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const radius = 80 + (priceData.percentChange * 2);
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
  ctx.fillStyle = priceData.percentChange >= 0 ? 'green' : 'red';
  ctx.fill();
  ctx.strokeStyle = '#fff';
  ctx.stroke();
  ctx.font = '20px Arial';
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.fillText(`ZIL/THB`, canvas.width / 2, canvas.height / 2 - 10);
  ctx.fillText(`${priceData.last}฿`, canvas.width / 2, canvas.height / 2 + 20);
}