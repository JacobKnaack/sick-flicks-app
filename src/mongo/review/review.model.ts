import { model, Model } from 'mongoose';
import reviewSchema, { IReview } from './review.schema';

export const ReviewModel: Model<IReview> = model('reviews', reviewSchema);
