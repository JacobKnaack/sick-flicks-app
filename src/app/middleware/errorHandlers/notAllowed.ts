import { FeathersError } from '@feathersjs/errors';
import { ErrorData } from './types';

export class NotAllowed extends FeathersError {
  constructor(msg: string, data?: ErrorData) {
    super(msg, 'not-allowed', 405, 'NotAllowed', data ? data : {});
  }
}
