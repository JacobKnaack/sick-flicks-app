import { ServiceMethods } from '@feathersjs/feathers';
import { FeathersError } from '@feathersjs/errors';
import { NotAllowed, BadRequest } from '@/app/middleware';
import { ProfileModel, UserModel, IUser, User, Profile, ProfileRoles, IProfile } from '@/mongo';

export class RegisterService implements ServiceMethods<any> {
  async find(): Promise<FeathersError> {
    const error = new NotAllowed("Method Not Allowed");
    return Promise.reject(error);
  }

  async get(): Promise<FeathersError> {
    const error = new NotAllowed("Method Not Allowed");
    return Promise.reject(error);
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
      const error = new BadRequest('Registration Request Malformed');
      return Promise.reject(error);
    }
  }

  async update(): Promise<FeathersError> {
    const error = new NotAllowed("Method Not Allowed");
    return Promise.reject(error);
  }

  async patch(): Promise<FeathersError> {
    const error = new NotAllowed("Method Not Allowed");
    return Promise.reject(error);
  }

  async remove():  Promise<FeathersError> {
    const error = new NotAllowed("Method Not Allowed");
    return Promise.reject(error);
  }
}
