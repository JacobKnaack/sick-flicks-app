import { CommentModel } from '../../../mongo';
import service from 'feathers-mongoose';

console.log("comment service", CommentModel);
export const CommentService = service({
  Model: CommentModel,
});
