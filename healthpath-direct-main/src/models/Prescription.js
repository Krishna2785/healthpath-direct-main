import mongoose from 'mongoose';

const { Schema } = mongoose;

const prescriptionMedicineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dosage: {
      type: String,
      trim: true,
    },
    frequency: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

const prescriptionSchema = new Schema(
  {
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true,
      index: true,
    },
    appointment: {
      type: Schema.Types.ObjectId,
      ref: 'Appointment',
      index: true,
    },
    medicines: [prescriptionMedicineSchema],
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

prescriptionSchema.index({ doctor: 1, createdAt: -1 });

export default mongoose.models.Prescription || mongoose.model('Prescription', prescriptionSchema);

