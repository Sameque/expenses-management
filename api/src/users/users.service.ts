import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findOneAndDelete({ _id: id });
  }
  async update(id: string, user: User): Promise<User> {
    await this.userModel.updateOne({ _id: id }, user, { new: true }).exec();
    return this.findOne(id);
  }
}
