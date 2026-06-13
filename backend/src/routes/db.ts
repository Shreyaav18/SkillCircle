import { Router } from 'express';
import { prisma } from 'skillcircle-db';

export const dbRouter = Router();

dbRouter.get('/ping', async (_request, response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    response.json({
      ok: true,
      database: 'connected',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown database error';

    response.status(500).json({
      ok: false,
      database: 'disconnected',
      message,
    });
  }
});
