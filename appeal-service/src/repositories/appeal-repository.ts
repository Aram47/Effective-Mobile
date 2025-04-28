import { IAppealRepository } from './iappeal-repository.js';
import { Appeal, IAppeal } from '../models/appeal-model.js';

export class AppealRepository implements IAppealRepository {
  async create(subject: string, description: string): Promise<IAppeal> {
    const appeal = new Appeal({
      subject,
      description,
      status: 'New',
      createdAt: new Date(),
    });
    return await appeal.save();
  }

  async startProcessing(id: string): Promise<IAppeal> {
    const appeal = await Appeal.findById(id);
    if (!appeal) {
      throw new Error('Appeal not found');
    }
    if (appeal.status !== 'New') {
      throw new Error('Appeal must be in New status to start processing');
    }
    appeal.status = 'In Progress';
    appeal.updatedAt = new Date();
    return await appeal.save();
  }

  async complete(id: string, resolution: string): Promise<IAppeal> {
    const appeal = await Appeal.findById(id);
    if (!appeal) {
      throw new Error('Appeal not found');
    }
    if (appeal.status !== 'In Progress') {
      throw new Error('Appeal must be in In Progress status to complete');
    }
    appeal.status = 'Completed';
    appeal.resolution = resolution;
    appeal.updatedAt = new Date();
    return await appeal.save();
  }

  async cancel(id: string, cancelReason: string): Promise<IAppeal> {
    const appeal = await Appeal.findById(id);
    if (!appeal) {
      throw new Error('Appeal not found');
    }
    if (appeal.status === 'Completed' || appeal.status === 'Canceled') {
      throw new Error('Appeal cannot be canceled');
    }
    appeal.status = 'Canceled';
    appeal.cancelReason = cancelReason;
    appeal.updatedAt = new Date();
    return await appeal.save();
  }

  async findByDateRange(date?: string, startDate?: string, endDate?: string): Promise<IAppeal[]> {
    let query: any = {};
    if (date) {
      const start = new Date(date);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      query.createdAt = { $gte: start, $lt: end };
    } else if (startDate && endDate) {
      query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    return await Appeal.find(query);
  }

  async cancelAllInProgress(cancelReason: string): Promise<number> {
    const result = await Appeal.updateMany(
      { status: 'In Progress' },
      { status: 'Canceled', cancelReason, updatedAt: new Date() }
    );
    return result.modifiedCount;
  }
}