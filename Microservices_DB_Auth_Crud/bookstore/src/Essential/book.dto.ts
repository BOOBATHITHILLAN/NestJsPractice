import mongoose from 'mongoose';

export interface BookDTO {
  title: string;
  author: string;
  release_date: Date;
  // user:mongoose.Schema.Types.ObjectId;
}
