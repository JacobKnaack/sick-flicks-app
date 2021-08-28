import feathers from '@feathersjs/feathers';
import '@feathersjs/transport-commons';
import morgan from 'morgan';
import express, { Application, errorHandler } from '@feathersjs/express';

import {
  MovieService,
  ReviewService,
  LoginService,
  RegisterService,
  CommentService,
} from '../services';
import { authenticateProfile } from '../middleware';

// creates our express application configured for feathers services.
export const api = express(feathers());

api.use(express.json());
api.use(express.urlencoded({ extended: true }));
api.use(morgan('tiny'));

api.configure(express.rest());
api.use('/movies', MovieService);
api.use('/reviews', ReviewService);
api.use('/comments', CommentService);
api.use('/register', new RegisterService());
api.use('/login', new LoginService());
api.use(errorHandler());

api.service('login').hooks({
  before: { create: [authenticateProfile] }
});
api.service('reviews').hooks({
  before: { create: [authenticateProfile], patch: [authenticateProfile] }
});
api.service('comments').hooks({
  before: { create: [authenticateProfile], patch: [authenticateProfile], remove: [authenticateProfile]  }
});

const app: Application = express(feathers()).use('/api/v1', api);

export class Server {
  app: Application;

  constructor() {
    this.app = app;
  }

  start(PORT: number | string): void {
    const server = this.app.listen(PORT, () => {
      console.log('Server up on port : ' + PORT);
    });
    api.setup(server);
  }
}
