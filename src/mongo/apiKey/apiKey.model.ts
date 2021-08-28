import { model, Model } from "mongoose";
import apiKeySchema, { IApiKey } from "./apiKey.schema";

interface IApiKeyModel extends Model<IApiKey> {
  generateKey(client_id: string): string,
  authenticateKey(client_id: string, key: string): boolean
}

export const ApiKeyModel: IApiKeyModel = model<IApiKey, IApiKeyModel>('api_keys', apiKeySchema);
