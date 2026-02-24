import mongoose from 'mongoose';

const { Schema } = mongoose;

const hospitalSchema = new Schema(
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
    state: {
      type: String,
      trim: true,
    },
    specialties: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Specialty',
      },
    ],
  },
  {
    timestamps: true,
  },
);

hospitalSchema.index({ city: 1, name: 1 });

export default mongoose.models.Hospital || mongoose.model('Hospital', hospitalSchema);

