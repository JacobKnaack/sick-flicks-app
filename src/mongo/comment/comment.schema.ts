import { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  _id: string,
  review_id: string,
  profile_id: string,
  content: string,
  likes: number,
  dislikes: number,
}

const commentSchema = new Schema<IComment>({
  review_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  profile_id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0
  },
  dislikes: {
    type: Number,
    default: 0
  }
});

export default commentSchema;
