import { config } from 'dotenv';

config();

function getRequiredEnv(name: string, fallback?: string) {
  const value = process.env[name] ?? fallback;

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const env = {
  port: Number(getRequiredEnv('PORT', '4000')),
  databaseUrl: getRequiredEnv('DATABASE_URL'),
};
