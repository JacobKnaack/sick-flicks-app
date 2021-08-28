import { HookContext } from '@feathersjs/feathers';
// import { FeathersError } from '@feathersjs/errors';
// import { ClientAppModel } from '@/mongo';

// authenticate the X-API-KEY header value and validate against the API Key model
export const authenticateClient = async (context: HookContext): Promise<void> => {

  console.log(context.params);
}
