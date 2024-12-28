export class Logger {
  static info(message) {
    console.log(`[INFO] ${message}`);
  }

  static error(message, error) {
    console.error(`[ERROR] ${message}`, error);
  }

  static serverStarted(httpPort, wsPort) {
    this.info(`
Server started successfully:
- HTTP server: http://localhost:${httpPort}
- WebSocket server: ws://localhost:${wsPort}
- MT4 Credentials:
  Username: demo
  Password: demo123
    `);
  }
}