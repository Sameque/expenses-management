import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class User {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  email: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
