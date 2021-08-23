import { ProfileModel } from '../../../mongo';
import service from 'feathers-mongoose';

export const ProfileService = service({
  Model: ProfileModel,
  whitelist: ['$populate']
});
