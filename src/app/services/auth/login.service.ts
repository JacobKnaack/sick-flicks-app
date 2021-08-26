import { ServiceMethods, Params } from '@feathersjs/feathers';
import { FeathersError } from '@feathersjs/errors';
import { NotAllowed, BadRequest, NotFound  } from '@/app/middleware';
import { ProfileModel, IProfile } from '@/mongo';

export class LoginService implements ServiceMethods<any> {
  async find(): Promise<FeathersError> {
    const error = new NotAllowed("Method Not Allowed");
    return Promise.reject(error);
  }

  async get(): Promise<FeathersError> {
    const error = new NotAllowed("Method Not Allowed");
    return Promise.reject(error);
  }

  async create(params: Params): Promise<IProfile | FeathersError> {
    const { user } = params;

    try {
      if (!user) {
        return new NotFound('No User Found');
      }

      const profile: IProfile | null = await ProfileModel.findOne({ user_id: user._id });
      return profile ? profile : new NotFound('No User Found');

    } catch(e) {

      const error = new BadRequest('Sick Flicks Login Error');
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

  async remove(): Promise<FeathersError> {
    const error = new NotAllowed("Method Not Allowed");
    return Promise.reject(error);
  }
}
