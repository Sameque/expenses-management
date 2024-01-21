import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Expense.name)
    private model: Model<Expense>,
  ) { }

  async create(dto: CreateExpenseDto): Promise<Expense> {
    console.log('dto', dto);

    return new this.model(dto).save();
  }

  async findAll(): Promise<Expense[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<Expense> {
    return await this.model.findById(id).exec();
  }

  async update(id: string, dto: UpdateExpenseDto): Promise<Expense> {
    await this.model.updateOne({ _id: id }, dto, { new: true }).exec();
    return this.findOne(id);
  }

  async remove(id: string): Promise<Expense> {
    return await this.model.findOneAndDelete({ _id: id });
  }
}
