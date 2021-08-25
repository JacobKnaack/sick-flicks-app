import { ServiceMethods, Params } from '@feathersjs/feathers';
import { FeathersError } from '@feathersjs/errors';
import { NotAllowed, BadRequest, NotFound  } from '@/app/middleware';
import { ProfileModel, IProfile } from '@/mongo';

export class LoginService implements ServiceMethods<any> {
  async find(): Promise<FeathersError> {
    return new NotAllowed('Method Not allowed');
  }

  async get(): Promise<FeathersError> {
    return new NotAllowed('Method Not allowed');
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
      // if 
      return new BadRequest('Sick Flicks Login Error');
    }
  }

  async update(): Promise<FeathersError> {
    return new NotAllowed('Method Not allowed');
  }

  async patch(): Promise<FeathersError> {
    return new NotAllowed('Method Not allowed');
  }

  async remove(): Promise<FeathersError> {
    return new NotAllowed('Method Not allowed');
  }
}
