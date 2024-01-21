import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Expense extends Document {
  @ApiProperty()
  @Prop()
  value: number;

  //   @ApiProperty()
  //   @Prop()
  //   date: date;
}
