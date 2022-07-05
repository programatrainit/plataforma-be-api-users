import mongoose, { Document, Schema } from 'mongoose';

const MetricSchema = new Schema(
  {
    name: { type: String },
    value: { type: String },
  },
  {
    timestamps: true,
    collection: 'metrics',
  },
);

export default mongoose.model<Document>('Metrics', MetricSchema);
