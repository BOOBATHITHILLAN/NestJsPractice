import mongoose, { Document } from 'mongoose';
//it defines how our data object structure will look like. Its responsible for creation of mongoDB _id
export interface Book extends Document {
  readonly title: string;
  readonly author: string;
  readonly release_date: Date;
  // readonly user:mongoose.Schema.Types.ObjectId;
}
