import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLength: 32,
    unique: true,
  },
});
export default mongoose.model("Branch",branchSchema);