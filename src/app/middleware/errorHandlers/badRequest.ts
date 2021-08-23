import { FeathersError } from '@feathersjs/errors';
import { ErrorData } from './types';

export class BadRequest extends FeathersError{
  constructor(msg: string, data?: ErrorData) {
    super(msg, 'bad-request', 400, 'BadRequest', data ? data : {});
  }
}
