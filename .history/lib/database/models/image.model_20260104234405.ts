import { Document, Schema, model, models } from "mongoose";

export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string;
  width?: number;
  height?: number;
  config?: object;
  transformationUrl?: string;
  aspectRatio?: string;
  color?: string;
  prompt?: string;

  // ✅ Clerk userId
  author: string;

  createdAt?: Date;
  updatedAt?: Date;
}

const ImageSchema = new Schema(
  {
    title: { type: String, required: true },
    transformationType: { type: String, required: true },
    publicId: { type: String, required: true },
    secureURL: { type: String, required: true },
    width: { type: Number },
    height: { type: Number },
    config: { type: Object },
    transformationUrl: { type: String },
    aspectRatio: { type: String },
    color: { type: String },
    prompt: { type: String },

    // ✅ Store Clerk userId directly
    author: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true, // ✅ replaces createdAt + updatedAt
  }
);

const Image = models.Image || model<IImage>("Image", ImageSchema);

export default Image;
