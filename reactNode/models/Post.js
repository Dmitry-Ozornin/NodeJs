import mongoose from "mongoose";

// модель пользователя

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, //храним id создателя
      ref: "User",
      required: true
    },
    avatarUrl: String,
  },
  {
    timestamps: true, // свойство создания и обновления
  },
);

export default mongoose.model("Post", PostSchema);
