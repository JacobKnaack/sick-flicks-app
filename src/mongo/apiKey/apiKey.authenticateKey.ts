import uuidApiKey from 'uuid-apikey';
import bcrypt from 'bcrypt';
import { Model} from 'mongoose';
import { IApiKey } from './';

/**
 * Checking for valid hashed key from Client, must present both client Id and key.
 * @param this 
 * @param client_id 
 * @param key 
 * @returns 
 */
export default async function authenticateKey(this: Model<IApiKey>, client_id: string,  key: string): Promise<boolean> {
  // try {
  //   const isKeyValid = uuidApiKey.isAPIKey(key);
  //   if (isKeyValid) {
  //     const hashedKey = await this.findOne({ client_id });
  //     const isHashValid = await bcrypt.compare(key, hashedKey.hash);
  //     return isHashValid;
  //   }
  // } catch (e) {
    return Promise.resolve(false);
  // }
}
