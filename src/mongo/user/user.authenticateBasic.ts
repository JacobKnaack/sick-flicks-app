import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from "./";

export default async function authenticateBasic(
  this: Model<IUser>,
  email: string,
  password: string
): Promise<IUser | null> {
  const user: IUser | null = await this.findOne({email});
  const valid: boolean = user ? await bcrypt.compare(password, user.password) : false;
  if (valid) return user;
  throw new Error('Invalid User');
}
