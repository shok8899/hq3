import { WebSocketServer } from 'ws';
import { WS_PORT } from '../config.js';
import { AuthService } from './authService.js';
import { Logger } from '../utils/logger.js';

export class WebSocketService {
  constructor(priceService) {
    this.priceService = priceService;
    this.authService = new AuthService();
    
    try {
      this.wss = new WebSocketServer({ 
        port: WS_PORT,
        clientTracking: true,
        handleProtocols: () => 'mt4',
        perMessageDeflate: false
      });
      
      Logger.info(`WebSocket server initialized on port ${WS_PORT}`);
      this.setupWebSocket();
    } catch (error) {
      Logger.error('Failed to initialize WebSocket server:', error);
      throw error;
    }
  }

  setupWebSocket() {
    this.wss.on('connection', (ws, req) => {
      Logger.info('New client connected');
      
      // Send welcome message
      ws.send(JSON.stringify({
        type: 'welcome',
        message: 'Connected successfully'
      }));
      
      // Send initial prices
      const prices = this.priceService.getLatestPrices();
      this.sendMT4Prices(ws, prices);

      const pingInterval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          try {
            ws.ping();
          } catch (error) {
            Logger.error('Ping failed:', error);
          }
        }
      }, 30000);

      ws.on('pong', () => {
        Logger.info('Received pong from client');
      });

      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          if (data.type === 'auth') {
            const isValid = this.authService.validateCredentials(
              data.username,
              data.password
            );
            ws.send(JSON.stringify({
              type: 'auth',
              success: isValid
            }));
          } else if (data.type === 'subscribe') {
            this.sendMT4Prices(ws, this.priceService.getLatestPrices());
          }
        } catch (error) {
          Logger.error('Error processing message:', error);
        }
      });

      ws.on('error', (error) => {
        Logger.error('WebSocket error:', error);
      });

      ws.on('close', (code, reason) => {
        Logger.info('Client disconnected:', {
          code,
          reason: reason.toString()
        });
        clearInterval(pingInterval);
      });
    });

    this.wss.on('error', (error) => {
      Logger.error('WebSocket server error:', error);
    });
  }

  broadcast(data) {
    this.wss.clients.forEach(client => {
      if (client.readyState === WebSocketServer.OPEN) {
        try {
          this.sendMT4Prices(client, data);
        } catch (error) {
          Logger.error('Error broadcasting to client:', error);
        }
      }
    });
  }

  sendMT4Prices(ws, prices) {
    if (ws.readyState !== WebSocketServer.OPEN) {
      return;
    }

    try {
      for (const [symbol, data] of Object.entries(prices)) {
        const mt4Message = {
          symbol: symbol,
          bid: parseFloat(data.price).toFixed(8),
          ask: parseFloat(data.price * 1.0002).toFixed(8),
          time: new Date().getTime()
        };
        
        ws.send(JSON.stringify(mt4Message));
      }
    } catch (error) {
      Logger.error('Error sending MT4 prices:', error);
    }
  }

  getConnectedClients() {
    return this.wss.clients.size;
  }
}