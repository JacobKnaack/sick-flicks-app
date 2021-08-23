import { Schema } from 'mongoose';
import { IReview } from '../review';

export interface IMovie {
  _id: string,
  movie_db_id: string,
  title: string,
  release: Date,
  image: string,
  reviews?: [IReview]
}

const movieSchema: Schema<IMovie> = new Schema<IMovie>({
  movie_db_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  release: {
    type: Date,
    required: true,
  }
});

movieSchema.virtual('reviews', {
  ref: 'reviews',
  localField: '_id',
  foreignField: 'movie_id',
});

export default movieSchema;
