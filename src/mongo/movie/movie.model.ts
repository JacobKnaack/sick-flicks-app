import { model, Model } from 'mongoose';
import movieSchema, { IMovie }  from './movie.schema';

export const MovieModel: Model<IMovie> = model('movies', movieSchema);
