import { MT4_CREDENTIALS } from '../config.js';

export class AuthService {
  validateCredentials(username, password) {
    return username === MT4_CREDENTIALS.username && 
           password === MT4_CREDENTIALS.password;
  }

  parseAuthHeader(authHeader) {
    if (!authHeader) return null;
    
    try {
      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf8');
      const [username, password] = credentials.split(':');
      return { username, password };
    } catch (error) {
      console.error('Error parsing auth header:', error);
      return null;
    }
  }
}