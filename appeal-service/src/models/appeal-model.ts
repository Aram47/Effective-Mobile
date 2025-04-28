import { Schema, model, Document } from 'mongoose';

export interface IAppeal extends Document {
  // bad case _id: number;
  subject: string;
  description: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Canceled';
  createdAt: Date;
  resolution?: string;
  cancelReason?: string;
  updatedAt?: Date;
}

const AppealSchema = new Schema({
  subject: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  status: {
    type: String,
    enum: ['New', 'In Progress', 'Completed', 'Canceled'],
    default: 'New',
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  resolution: { 
    type: String, 
    required: false 
  },
  cancelReason: { 
    type: String, 
    required: false 
  },
  updatedAt: { 
    type: Date, required: false 
  },
}, {
  timestamps: true
});

export const Appeal = model<IAppeal>('Appeal', AppealSchema);