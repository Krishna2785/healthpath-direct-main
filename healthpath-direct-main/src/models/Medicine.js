import mongoose from 'mongoose';

const { Schema } = mongoose;

const medicineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    pharmacy: {
      type: Schema.Types.ObjectId,
      ref: 'Pharmacy',
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

medicineSchema.index({ pharmacy: 1, name: 1 });

export default mongoose.models.Medicine || mongoose.model('Medicine', medicineSchema);

