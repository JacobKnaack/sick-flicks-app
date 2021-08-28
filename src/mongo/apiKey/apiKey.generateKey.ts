import uuidApiKey from 'uuid-apikey';
import bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { IApiKey } from '.';

export default async function generateKey(this: Model<IApiKey>, client_id: string): Promise<string> {
  const { uuid, apiKey } = uuidApiKey.create();
  const hash = await bcrypt.hash(apiKey, 10);

  await this.create({
    _id: uuid,
    hash,
    client_id
  });

  return apiKey;
}
