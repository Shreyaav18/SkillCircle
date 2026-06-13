import cors from 'cors';
import express from 'express';
import { env } from './env.js';
import { dbRouter } from './routes/db.js';
import { healthRouter } from './routes/health.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (_request, response) => {
  response.json({
    name: 'SkillCircle API',
    status: 'running',
  });
});

app.use('/health', healthRouter);
app.use('/db', dbRouter);

app.listen(env.port, () => {
  console.log(`SkillCircle backend listening on http://localhost:${env.port}`);
});
