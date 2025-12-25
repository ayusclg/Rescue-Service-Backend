import { createClient, RedisClientType } from 'redis';

export const redisClient: RedisClientType = createClient({
  url: 'redis://localhost:6379'
});

redisClient.on('connect', () => {
  console.log('Redis Connected');
});
redisClient.on('error', (err: unknown) => {
  console.log('Redis Connection Error', err);
});

export async function connectRedis() {
  if (redisClient.isOpen) return;
  await redisClient.connect();
}

export async function disconnectRedis() {
  if (redisClient.isOpen) {
    await redisClient.quit();
  }
}
