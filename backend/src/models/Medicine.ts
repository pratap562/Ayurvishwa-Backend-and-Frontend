import { Document, Schema, Types, model } from 'mongoose';

export interface MedicineDocument extends Document {
  name: string;
  unit: 'gram' | 'ml';
  quantity: number;
  vendor: string;
  hospitalId: Types.ObjectId;
  lowStockThreshold: number;
  createdAt: Date;
  updatedAt: Date;
}

const medicineSchema = new Schema<MedicineDocument>(
  {
    name: { type: String, required: true },
    unit: { type: String, enum: ['gram', 'ml'], required: true },
    quantity: { type: Number, required: true, default: 0 },
    vendor: { type: String, required: true },
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
      required: true,
      index: true,
    },
    lowStockThreshold: { type: Number, default: 10 },
  },
  { timestamps: true }
);

// Compound index for unique medicine names per hospital
medicineSchema.index({ name: 1, hospitalId: 1 }, { unique: true });

export const Medicine = model<MedicineDocument>('Medicine', medicineSchema);
