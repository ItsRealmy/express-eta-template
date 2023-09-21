import 'dotenv/config';
import 'colors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { Eta } from 'eta';

async function startServer(port = process.env.SERVER_PORT || 8080) {
  const app = express();
  
  app.use(express.json());
  app.use(cookieParser());

  const eta = new Eta({ views: './views' });
  app.use((req, res, next) => {
    res.render = async (template, data, meta) => {
      const rendered = await eta.renderAsync(template, data, meta);
      res.send(rendered);
      return true;
    }
    next();
  });

  app.use(await (await import('./server/index.js')).default);

  app.listen(port, () => console.log(`[${'Application'.bold}] Live on http://localhost:${port}`.green));
}

startServer();