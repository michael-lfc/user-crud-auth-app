import { mongoose } from "../config/db.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    age: {
      type: Number,
      required: true,
      min: 1,
      max: 120,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for password
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Export the model
const User = mongoose.model("User", userSchema);
export default User;