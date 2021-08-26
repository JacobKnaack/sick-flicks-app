import { CommentModel } from '@/mongo';
import service from 'feathers-mongoose';

export const CommentService = service({
  Model: CommentModel,
  paginate: {
    default: 20,
    max: 50,
  },
});
