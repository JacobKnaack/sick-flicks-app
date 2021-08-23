import { Schema, Document } from 'mongoose';
import { IMovie, IComment } from '../';

export interface IReview extends Document {
  _id: string,
  title: string,
  profile_id: string,
  movie_id: string,
  html: string,
  image: string,
  likes: number,
  dislikes: number,
  movie?: IMovie,
  comments?: [IComment]
}

const reviewSchema: Schema<IReview> = new Schema<IReview>({
  title: {
    type: String,
    required: true,
  },
  profile_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Profile'
  },
  movie_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'movies'
  },
  html: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  }
});

reviewSchema.virtual('movie', {
  ref: 'movies',
  localField: 'movie_id',
  foreignField: '_id',
  justOne: true,
});

reviewSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'review_id',
})

export default reviewSchema;
