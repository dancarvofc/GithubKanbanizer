import * as dotenv from 'dotenv';
import { bootstrap } from './lib/app.js';

dotenv.config();

const port = Number(process.env.PORT) || 3001;

async function start() {
  const app = await bootstrap();

  try {
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 GitHub Kanbanizer is On Fire!`);
    console.log(`📡 Server: http://localhost:${port}`);
    console.log(`📄 API Docs: http://localhost:${port}/docs`);
  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
}

start();