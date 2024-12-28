export function getWelcomeHtml() {
  return `
    <html>
      <head>
        <title>Crypto Market Data Server</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          h1 { color: #333; }
          ul { line-height: 1.6; }
        </style>
      </head>
      <body>
        <h1>Crypto Market Data Server</h1>
        <p>Server is running successfully!</p>
        <h2>Connection Information:</h2>
        <ul>
          <li>WebSocket URL: ws://[your-server-ip]:8080</li>
          <li>Username: demo</li>
          <li>Password: demo123</li>
        </ul>
        <h2>Available Endpoints:</h2>
        <ul>
          <li><a href="/prices">/prices</a> - Get latest prices</li>
          <li><a href="/status">/status</a> - Server status</li>
        </ul>
      </body>
    </html>
  `;
}