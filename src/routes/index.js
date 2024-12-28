import { getWelcomeHtml } from '../templates/welcome.js';

export function setupRoutes(app, priceService, wsService) {
  app.get('/', (req, res) => {
    res.send(getWelcomeHtml());
  });

  app.get('/prices', (req, res) => {
    res.json(priceService.getLatestPrices());
  });

  app.get('/status', (req, res) => {
    res.json({
      status: 'running',
      connections: wsService.getConnectedClients(),
      timestamp: new Date().toISOString()
    });
  });
}