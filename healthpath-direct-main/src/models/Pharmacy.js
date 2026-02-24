import mongoose from 'mongoose';

const { Schema } = mongoose;

const pharmacySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

pharmacySchema.index({ city: 1, name: 1 });

export default mongoose.models.Pharmacy || mongoose.model('Pharmacy', pharmacySchema);

