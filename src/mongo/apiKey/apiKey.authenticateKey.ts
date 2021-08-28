import uuidApiKey from 'uuid-apikey';
import bcrypt from 'bcrypt';
import { Model} from 'mongoose';
import { IApiKey } from './';

/**
 * Checking for valid hashed key from Client, must present both client Id and key.
 * @param this {MongooseModel}
 * @param client_id {string}
 * @param key {string}
 * @returns boolean
 */
export default async function authenticateKey(
  this: Model<IApiKey>,
  client_id: string,
  key: string
): Promise<boolean> {
  const isKeyValid = uuidApiKey.isAPIKey(key);
  if (!isKeyValid) return false;
  try {
    const hashedKey = await this.findOne({ client_id }) || {hash: 'wrong'};
    const isHashValid = await bcrypt.compare(key, hashedKey.hash);
    return isHashValid;
  } catch (e) {
    console.error(e);
    return false;
  }
}
