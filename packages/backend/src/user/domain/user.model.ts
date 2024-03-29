import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { UserRole } from './userRole.enum';
@ObjectType()
@Schema()
export class User {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(() => String, {
    nullable: true,
    description:
      'email is not mandatory for ease of registration and is filled out later',
  })
  @Prop()
  email?: string;

  // password is not returned to any client
  @Prop()
  password: string;

  @Field(() => String, { nullable: true })
  @Prop()
  firstName?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  lastName?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  nationalCode?: string;

  @Field(() => String)
  @Prop({ unique: true, required: true })
  phone: string;

  @Field(() => String, { nullable: true })
  @Prop()
  address?: string;

  @Field(() => String, { nullable: true })
  @Prop()
  avatar?: string;

  @Field(() => [UserRole], { defaultValue: [UserRole.CUSTOMER] })
  @Prop()
  roles?: UserRole[];
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
