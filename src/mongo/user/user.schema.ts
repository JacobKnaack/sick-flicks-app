import { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IProfile } from '../';
import authenticateBasic from './user.authenticateBasic';
import authenticateBearer from './user.authenticateBearer';

const API_SECRET: string = process.env.API_SECRET || 'SECRET_STRING_FOR_TESTING';

export type User = {
  email: string,
  password: string,
}

export interface IUser extends Document {
  _id: string,
  email: string,
  password: string,
  token: string,
  profile: IProfile
}

const userSchema: Schema<IUser> = new Schema<IUser>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  toJSON: {
    virtuals: true,
    getters: true
  },
  toObject: {
    virtuals: true
  },
});

userSchema.virtual('token').get(
  function(this: IUser) {
    const data: JwtPayload = { email: this.email };
    return jwt.sign(data, API_SECRET);
  }
);

userSchema.virtual('profile', {
  ref: 'profiles',
  localField: '_id',
  foreignField: 'user_id',
  justOne: true
});

userSchema.pre('save', async function(): Promise<void> {
  if (this.isModified('password')) { 
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.statics.authenticateBasic = authenticateBasic;
userSchema.statics.authenticateBearer = authenticateBearer;

userSchema.methods.sanitize = function(this: IUser): User {
  const data = this.toObject();
  return data;
}

export default userSchema;
