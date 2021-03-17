import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'schemas/user.schema';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: IUser): Promise<UserDocument> {
    return new this.userModel(user).save();
  }

  async findUserById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findUserByUsername(username: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ username }).exec();
  }

  async editUser(user: {
    username: string;
    avatar: string | null;
  }): Promise<UserDocument> {
    return this.userModel
      .findOneAndUpdate({ username: user.username }, user, { new: true })
      .exec();
  }

  async deleteUser(user: IUser): Promise<UserDocument> {
    return this.userModel.findOneAndDelete({ username: user.username }).exec();
  }
}
