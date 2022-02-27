import { Document, model, Schema } from "mongoose";
export interface IUser extends Document {
  email: string;
  password?: string;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<IUser>("User", userSchema);

export default User;
