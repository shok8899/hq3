// Server configuration
export const HTTP_PORT = 3000;
export const WS_PORT = 8080;

// API configuration
export const BINANCE_REST_URL = 'https://api.binance.com/api/v3';
export const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';

// MT4 configuration
export const MT4_CREDENTIALS = {
  username: 'demo',
  password: 'demo123'
};

// Trading pairs configuration
export const SUPPORTED_PAIRS = [
  'BTCUSDT', 'ETHUSDT', 'XRPUSDT', 'DOGEUSDT',
  'ADAUSDT', 'DOTUSDT', 'LTCUSDT', 'SOLUSDT',
  'BNBUSDT', 'TRXUSDT', 'MATICUSDT', 'AVAXUSDT',
  'LINKUSDT', 'XLMUSDT', 'UNIUSDT'
];