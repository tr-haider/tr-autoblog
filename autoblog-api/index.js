const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../autoblog-ai/dist/app.module');

let app;

module.exports = async (req, res) => {
  if (!app) {
    try {
      app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log'],
      });
      
      app.enableCors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      });
      
      await app.init();
    } catch (error) {
      console.error('Failed to initialize NestJS app:', error);
      return res.status(500).json({ error: 'Failed to initialize application' });
    }
  }

  try {
    const httpAdapter = app.getHttpAdapter();
    const instance = httpAdapter.getInstance();
    
    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      return res.status(200).end();
    }
    
    // Remove /api prefix from the URL for internal routing
    req.url = req.url.replace(/^\/api/, '');
    
    // Handle the request with NestJS
    instance(req, res);
  } catch (error) {
    console.error('Request handling error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
