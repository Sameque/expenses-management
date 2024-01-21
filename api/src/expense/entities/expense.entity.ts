import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Expense {
  @ApiProperty()
  @Prop(Date)
  date: Date;

  @ApiProperty()
  @Prop(Number)
  value: number;

  @ApiProperty()
  @Prop(String)
  description: string;

  @ApiProperty()
  @Prop(Number)
  type: number;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
