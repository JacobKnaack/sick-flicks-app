import { HookContext } from '@feathersjs/feathers';
import { UserModel } from '../../../mongo/user/user.model';
import { IUser } from '../../../mongo';
import { BadRequest } from '../';
import base64 from 'base-64';

const getUserFromAuthString = async (type: string, authString: string): Promise<IUser | Error> => {
  switch(type.toLowerCase()) {
    case 'basic':
      let [ user, pass ] = base64.decode(authString).split(':');
      return await UserModel.authenticateBasic(user, pass);
    case 'bearer':
      return await UserModel.authenticateBearer(authString);
    default:
      return new Error('User Validation Error');
  }
}

export const authenticate = async (context: HookContext ): Promise<void> => {
  let { headers } = context.params;
  if (!headers) {
    context.statusCode = 400;
    context.error = new BadRequest('No Authorization Headers Found');
    return
  }
  let authHeader = headers.authorization || headers.Authorization;

  try {
    let [ type, string ] = authHeader.split(' ');
    let user = await getUserFromAuthString(type, string);
    context.data.user = user;
    return;
  } catch(e) {
    console.error(e);
    context.statusCode = 500;
    context.error = e;
    return;
  }
}
