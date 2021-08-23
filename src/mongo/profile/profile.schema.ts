import { Schema, Document } from 'mongoose';
import { IReview } from '../review';

export enum ProfileRoles {
  user = "user",
  writer = "writer",
  admin = "admin"
}

export type Profile = {
  username: string,
  image?: string,
  user_id: string,
  role: ProfileRoles,
}

export interface IProfile extends Document {
  _id: string,
  username: string,
  image: string,
  user_id: string,
  role: ProfileRoles,
  likes: number,
  dislikes: number,
  reviews?: [IReview]
}

const profileSchema: Schema<IProfile> = new Schema<IProfile>({
  username: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: null,
  }, 
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
  role: {
    type: String,
    enum: ['user', 'writer', 'admin'],
    required: true,
    default: 'user',
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  dislikes: {
    type: Number,
    required: true,
    default: 0,
  }
});

profileSchema.virtual('reviews', {
  ref: 'reviews',
  localField: '_id',
  foreignField: 'profile_id',
});

export default profileSchema;
