import { ProfileModel } from '../../../mongo/profile/profile.model';
import service from 'feathers-mongoose';

export const ProfileService = service({
  Model: ProfileModel,
  whitelist: ['$populate']
});
