import { Schema, Document } from 'mongoose';
import { IProfile } from '../profile/profile.schema';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const API_SECRET: string = process.env.API_SECRET || 'SECRET_STRING_FOR_TESTING';

export type User = {
  email: string,
  password: string
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
    let data: JwtPayload = { email: this.email };
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

userSchema.statics.authenticateBasic = async function(email: string, password: string): Promise<IUser> {
  const user: IUser = await this.findOne({email});
  const valid: boolean = await bcrypt.compare(password, user.password);
  if (valid) return user;
  throw new Error('Invalid User');
}

userSchema.statics.authenticateBearer = async function(token: string): Promise<IUser> {
  let payload: string | JwtPayload = jwt.verify(token, API_SECRET);
  if (!payload) throw new Error('Invalid Token');
  try {
    // cast the <any> type onto the payload vairble.
    let validUser = await this.findOne({ email: (<any>payload).email });
    return validUser;
  } catch (e) {
    console.error(e);
    throw new Error('No User found');
  }
}

export default userSchema;
