export class PriceUpdater {
  constructor(priceService, wsService) {
    this.priceService = priceService;
    this.wsService = wsService;
    this.updateInterval = 1000;
  }

  async updatePrices() {
    try {
      const prices = await this.priceService.fetchPrices();
      this.wsService.broadcast(prices);
    } catch (error) {
      console.error('Error updating prices:', error);
    }
  }

  start() {
    // Initial price fetch
    this.updatePrices();
    // Start interval
    this.intervalId = setInterval(() => this.updatePrices(), this.updateInterval);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}