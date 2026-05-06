const http = require('http');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';
const PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

console.log(`Starting keep-alive ping every 10 minutes to ${SERVER_URL}`);

function pingServer() {
  const url = new URL(SERVER_URL);
  
  const req = http.request(url, { method: 'GET' }, (res) => {
    console.log(`[${new Date().toISOString()}] Ping successful - Status: ${res.statusCode}`);
  });

  req.on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Ping failed:`, err.message);
  });

  req.end();
}

setInterval(pingServer, PING_INTERVAL);

pingServer();