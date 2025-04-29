import { 
  Schema, 
  model, 
  Document, 
  Model 
} from 'mongoose';

export interface IAppeal extends Document {
  _id: string;
  subject: string;
  description: string;
  status: 'New' | 'In Progress' | 'Completed' | 'Canceled';
  createdAt: Date;
  resolution?: string;
  cancelReason?: string;
  updatedAt?: Date;
}

const AppealSchema: Schema = new Schema({
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

export const Appeal: Model<IAppeal> = model<IAppeal>('Appeal', AppealSchema);