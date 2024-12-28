import fetch from 'node-fetch';
import { BINANCE_REST_URL, SUPPORTED_PAIRS } from '../config.js';

export class PriceService {
  constructor() {
    this.latestPrices = {};
  }

  async fetchPrices() {
    try {
      const symbols = SUPPORTED_PAIRS.join('","');
      const response = await fetch(
        `${BINANCE_REST_URL}/ticker/24hr?symbols=["${symbols}"]`
      );
      const data = await response.json();
      
      // Format Binance data
      this.latestPrices = data.reduce((acc, item) => {
        acc[item.symbol] = {
          price: parseFloat(item.lastPrice),
          change24h: parseFloat(item.priceChangePercent),
          high24h: parseFloat(item.highPrice),
          low24h: parseFloat(item.lowPrice),
          volume: parseFloat(item.volume)
        };
        return acc;
      }, {});

      return this.latestPrices;
    } catch (error) {
      console.error('Error fetching prices from Binance:', error);
      return this.latestPrices;
    }
  }

  getLatestPrices() {
    return this.latestPrices;
  }
}