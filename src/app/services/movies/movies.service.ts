import { MovieModel } from '../../../mongo';
import service from 'feathers-mongoose';

export const MovieService = service({
  Model: MovieModel,
  paginate: {
    default: 10,
    max: 20,
  },
  whitelist: ['$populate']
});
