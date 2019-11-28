import { Document } from 'mongoose';

export interface Note extends Document {
  title: String;
  note: String;
}
