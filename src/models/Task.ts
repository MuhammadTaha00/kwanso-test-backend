import { Document, model, Schema } from "mongoose";

export interface ITask extends Document {
  name: string;
}

const taskSchema: Schema = new Schema({
  name: {
    type: String,
  },
});

const Task = model<ITask>("Task", taskSchema);

export default Task;
