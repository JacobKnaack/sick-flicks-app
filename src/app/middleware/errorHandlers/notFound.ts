import { FeathersError } from '@feathersjs/errors';
import { ErrorData } from './types';

export class NotFound extends FeathersError {
  constructor(msg: string, data?: ErrorData) {
    super(msg, 'not-found', 404, 'NotFound', data ? data : {});
  }
}
