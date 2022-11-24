import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  APP_PREFIX: process.env.APP_PREFIX || 'real-estate',
  APP_PORT: process.env.APP_PORT || 3005,
  CHAT_BOT_PORT: process.env.CHAT_BOT_PORT || 3009,
  DATABASE: {
    CONNECT: process.env.DATABASE_CONNECT as any,
    HOST: process.env.DATABASE_HOST,
    PORT: Number(process.env.DATABASE_PORT),
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME,
  },
  ROOT_PATH: process.cwd(),
};
