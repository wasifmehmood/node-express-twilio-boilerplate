const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  host: process.env.HOST || '127.0.0.1',
  port: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || '127.0.0.1',
  DB_USER: process.env.DB_USER || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  SERVICE_TWILIO_ACCOUNT_ID: process.env.SERVICE_TWILIO_ACCOUNT_ID || '',
  SERVICE_TWILIO_AUTH: process.env.SERVICE_TWILIO_AUTH || '',
  SERVICE_TWILIO_SERVICE_ID: process.env.SERVICE_TWILIO_SERVICE_ID || '',
};
