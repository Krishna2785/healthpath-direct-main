import mongoose from 'mongoose';

const { Schema } = mongoose;

const doctorSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
      index: true,
    },
    specialty: {
      type: Schema.Types.ObjectId,
      ref: 'Specialty',
      index: true,
    },
    experienceYears: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

doctorSchema.index({ hospital: 1, specialty: 1 });

export default mongoose.models.Doctor || mongoose.model('Doctor', doctorSchema);

