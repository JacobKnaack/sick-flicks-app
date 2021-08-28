import { Schema, Document } from 'mongoose';
import generateKey from './apiKey.generateKey';
import authenticateKey from './apiKey.authenticateKey';

export interface IApiKey extends Document {
  _id: string,
  hash: string,
  client_id: string,
}

const apiKeySchema: Schema<IApiKey> = new Schema<IApiKey>({
  _id: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true,
  },
  client_id: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

apiKeySchema.statics.generateKey = generateKey;
apiKeySchema.statics.authenticateKey = authenticateKey;

export default apiKeySchema;
