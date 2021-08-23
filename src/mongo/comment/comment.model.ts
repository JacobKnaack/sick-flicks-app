import { model, Model } from 'mongoose';
import commentSchema, { IComment } from './comment.schema';

export const CommentModel: Model<IComment> = model('comments', commentSchema);
