import mongoose from 'mongoose';

const { Schema } = mongoose;

const specialtySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Specialty || mongoose.model('Specialty', specialtySchema);

