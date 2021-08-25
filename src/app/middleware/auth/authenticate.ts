import { HookContext } from '@feathersjs/feathers';
import { UserModel } from '@/mongo/user/user.model';
import { IUser } from '@/mongo';
import { BadRequest } from '../';
import base64 from 'base-64';

const getUserFromAuthString = async (type: string, authString: string): Promise<IUser | Error> => {
  let user: string;
  let pass : string;

  switch(type.toLowerCase()) {
    case 'basic':
      [ user, pass ] = base64.decode(authString).split(':');
      return await UserModel.authenticateBasic(user, pass);
    case 'bearer':
      return await UserModel.authenticateBearer(authString);
    default:
      return new Error('User Validation Error');
  }
}

export const authenticate = async (context: HookContext ): Promise<void | Error> => {
  const { headers } = context.params;
  if (!headers) {
    context.statusCode = 400;
    const error = new BadRequest('No Authorization Headers Found')
    context.error = error;
    return error;
  }
  const authHeader = headers.authorization || headers.Authorization;

  try {
    const [ type, string ] = authHeader.split(' ');
    const user = await getUserFromAuthString(type, string);
    context.data.user = user;
    return;
  } catch(e) {
    const error = new BadRequest('bearer auth error', e);
    context.statusCode = 500;
    context.error = error;
    return error;
  }
}
