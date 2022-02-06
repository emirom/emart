import { Field, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@InputType()
export class CreateUserInput {
  @Field(()=>String)
  name: string;
}


@InputType()
export class ListUserInput {
  @Field(()=>String, {nullable:true})
  _id?: MongooseSchema.Types.ObjectId;

  @Field(()=>String, {nullable:true})
  name?: string;
}

@InputType()
export class UpdateUserInput {
  @Field(()=>String)
  _id: MongooseSchema.Types.ObjectId;

  @Field(()=>String,{nullable:true})
  name?: string;
}