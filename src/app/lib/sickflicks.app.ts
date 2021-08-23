import feathers from '@feathersjs/feathers';
import '@feathersjs/transport-commons';
import express, { Application } from '@feathersjs/express';

import {
  MovieService,
  ReviewService,
  LoginService,
  RegisterService
} from '../services';
import { authenticate } from '../middleware';

// creates our express application configured for feathers services.
export const api = express(feathers());

api.use(express.json());
api.use(express.urlencoded({ extended: true }));

api.configure(express.rest());
api.use('/movies', MovieService);
api.use('/reviews', ReviewService);
api.use('/register', new RegisterService());
api.use('/login', new LoginService());
api.hooks({
  error(ctx) {
    console.log(ctx);
  }
})

api.service('login').hooks({
  before: {
    create: [authenticate]
  }
});

api.service('reviews').hooks({
  before: {
    create: [authenticate]
  }
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
