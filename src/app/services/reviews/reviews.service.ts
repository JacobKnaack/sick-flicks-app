import { ReviewModel } from '@/mongo';
import service from 'feathers-mongoose';

export const ReviewService = service({
  Model: ReviewModel,
  paginate: {
    default: 10,
    max: 20,
  },
  whitelist: ['$populate']
});
