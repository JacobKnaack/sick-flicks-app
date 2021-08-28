import mongoose from 'mongoose';

export async function startConnection(uri: string): Promise<void> {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log('Mongo Connection established at : ' + uri);

  } catch (e) {
    console.error(e);
    throw new Error("Mongo Connection Error");

  }
}

export async function stopConnection(): Promise<void> {
  try {
    await mongoose.disconnect();
    console.log('Mongoose Client disconnected');

  } catch (e) {
    console.error(e);
    throw new Error('Mongoose Dis-connection error');

  }
}

/**
 * abstraction for handling mongoose specific connection operations
 */
export class MongoConnection {
  uri: string;

  constructor(mongodbURI: string) {
    this.uri = mongodbURI;
  }

  start = (): Promise<void> => startConnection(this.uri);
  stop = stopConnection;
}
