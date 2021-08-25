import 'module-alias/register';
import dotenv from 'dotenv';
import { sickFlickApp } from './app';
import { MongoConnection } from './mongo';

dotenv.config();
const MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';
const PORT: string | number = process.env.PORT || 3030;

const mongodb = new MongoConnection(MONGODB_URI);
const appServer = new sickFlickApp.Server();

mongodb.start();
appServer.start(PORT);
