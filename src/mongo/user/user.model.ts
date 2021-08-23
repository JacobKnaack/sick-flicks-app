import { model, Model }  from 'mongoose';
import userSchema, { IUser, } from './user.schema';

interface UserModel extends Model<IUser> {
  authenticateBasic(user: string, pass: string): IUser,
  authenticateBearer(token: string): IUser
}

export const UserModel: UserModel = model<IUser, UserModel>('users', userSchema); 
