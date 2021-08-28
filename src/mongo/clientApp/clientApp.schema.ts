import { Schema, Document } from 'mongoose';
import { IApiKey } from '../';

export interface IClientApp extends Document {
  _id: string,
  name: string,
  domains: string[],
  api_key: IApiKey
}

const clientAppSchema: Schema<IClientApp> = new Schema<IClientApp>({
  name: {
    type: String,
    required: true
  },
  domains: {
    type: [String],
    required: true
  },
});

clientAppSchema.virtual('api_key', {
  ref: 'api_keys',
  localField: '_id',
  foreignField: 'client_id',
  justOne: true,
});

export default clientAppSchema;
