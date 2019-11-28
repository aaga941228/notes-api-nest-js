import { Schema } from 'mongoose';

export const NoteSchema = new Schema({
  title: { type: String },
  note: { type: String },
  createdAt: { type: String, default: Date.now },
});
