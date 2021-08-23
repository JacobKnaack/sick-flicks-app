import { ReviewModel } from '../../../mongo/review/review.model';
import service from 'feathers-mongoose';

export const ReviewService = service({
  Model: ReviewModel,
  paginate: {
    default: 10,
    max: 20,
  },
  whitelist: ['$populate']
});
