import { Model } from 'mongoose';
import { IUser, User } from './';
import jwt, { JwtPayload } from 'jsonwebtoken';

const API_SECRET: string = process.env.API_SECRET || 'SECRET_STRING_FOR_TESTING';

export default async function authenticateBearer (
  this: Model<IUser>,
  token: string
): Promise<IUser | null> {
  const payload: string | JwtPayload = jwt.verify(token, API_SECRET);
  if (!payload) throw new Error('Invalid Token');
  try {
    const validUser = await this.findOne({ email: (<User>payload).email });
    return validUser;
  } catch (e) {
    throw new Error('No User found');
  }
}
