import { model, Model } from 'mongoose';
import ProfileSchema, { IProfile } from './profile.schema';

export const ProfileModel: Model<IProfile> = model('profiles', ProfileSchema);
