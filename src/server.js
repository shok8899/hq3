import express from 'express';
import { HTTP_PORT, WS_PORT } from './config.js';
import { PriceService } from './services/priceService.js';
import { WebSocketService } from './services/websocketService.js';
import { PriceUpdater } from './services/priceUpdater.js';
import { setupRoutes } from './routes/index.js';
import { setupCors } from './middleware/cors.js';
import { Logger } from './utils/logger.js';

const app = express();
const priceService = new PriceService();
const wsService = new WebSocketService(priceService);
const priceUpdater = new PriceUpdater(priceService, wsService);

// Setup middleware
setupCors(app);

// Setup routes
setupRoutes(app, priceService, wsService);

// Start price updates
priceUpdater.start();

// Start HTTP server
app.listen(HTTP_PORT, () => {
  Logger.serverStarted(HTTP_PORT, WS_PORT);
});