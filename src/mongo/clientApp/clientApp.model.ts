import { model, Model } from 'mongoose';
import clientAppSchema, { IClientApp } from "./clientApp.schema";

export const ClientAppModel: Model<IClientApp> = model<IClientApp>('client_apps', clientAppSchema);
