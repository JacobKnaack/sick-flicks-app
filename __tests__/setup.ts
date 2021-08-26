import dotenv from 'dotenv';
import { connection } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { startConnection, stopConnection } from '../src/mongo/lib';

dotenv.config();
let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const uri: string = server.getUri();
  await startConnection(uri);
});
afterAll(async () => {
  if (connection.readyState === 1) {
    await server.stop();
  }
  
  await stopConnection();
});

test('test server should be defined', () => {
  expect(server).toBeDefined();
});
