import { ServiceMethods } from '@feathersjs/feathers';
import { FeathersError } from '@feathersjs/errors';
import { NotAllowed, BadRequest } from '../../middleware';
import { UserModel } from '../../../mongo/user/user.model';
import { ProfileModel } from '../../../mongo/profile/profile.model';
import { IUser, User, Profile, ProfileRoles, IProfile } from '../../../mongo';

export class RegisterService implements ServiceMethods<any> {
  async find(): Promise<FeathersError> {
    return new NotAllowed("Method not allowed");
  }

  async get(): Promise<FeathersError> {
    console.log('GET');
    return new NotAllowed("Method not allowed");
  }

  async create(data: User): Promise<IProfile | FeathersError> {
    try {

      const user: IUser = await UserModel.create(data);

      const profileData: Profile = {
        username: user.email,
        user_id: user._id,
        role: ProfileRoles["user"],
      }

      const profile: IProfile = await ProfileModel.create(profileData);

      return profile;
    } catch(e) {

      console.error(e);
      return new BadRequest('Registration Request Malformed');
    }
  }

  async update(): Promise<FeathersError> {
    return new NotAllowed("Method not allowed");
  }

  async patch(): Promise<FeathersError> {
    return new NotAllowed("Method not allowed");
  }

  async remove():  Promise<FeathersError> {
    return new NotAllowed("Method not allowed");
  }
}
