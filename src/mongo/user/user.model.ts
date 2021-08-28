import { model, Model }  from 'mongoose';
import userSchema, { IUser, } from './user.schema';

interface IUserModel extends Model<IUser> {
  authenticateBasic(user: string, pass: string): IUser,
  authenticateBearer(token: string): IUser
}

export const UserModel: IUserModel = model<IUser, IUserModel>('users', userSchema); 
