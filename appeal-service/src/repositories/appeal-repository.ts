import { IAppealRepository } from './iappeal-repository.js';
import { Appeal, IAppeal } from '../models/appeal-model.js';
import { EXCEPTION_MESSAGE } from '../constants/index.js';

export class AppealRepository implements IAppealRepository {
  async create(subject: string, description: string): Promise<IAppeal> {
    try {
      const appeal: IAppeal = new Appeal({
        subject,
        description,
        status: 'New',
        createdAt: new Date(),
      });
      const savedAppeal: IAppeal = await appeal.save();
      return savedAppeal;
    } catch (error) {
      throw new Error(EXCEPTION_MESSAGE.CREATE_EXCEPTION);
    }
  }

  async startProcessing(id: string): Promise<IAppeal> {
    let appeal: IAppeal | null = null;
    try {
      appeal = await Appeal.findById(id)
    } catch (error) {
      throw new Error(EXCEPTION_MESSAGE.INVALID_ID);
    }
    if (!appeal) {
      throw new Error(EXCEPTION_MESSAGE.INVALID_APPEAL);
    }
    if (appeal.status !== 'New') {
      throw new Error(EXCEPTION_MESSAGE.STATUS_NOT_NEW);
    }
    appeal.status = 'In Progress';
    appeal.updatedAt = new Date();
    return await appeal.save();
  }

  async complete(id: string, resolution: string): Promise<IAppeal> {
    let appeal: IAppeal | null = null;
    try {
      appeal = await Appeal.findById(id)
    } catch (error) {
      throw new Error(EXCEPTION_MESSAGE.INVALID_ID);
    }
    if (!appeal) {
      throw new Error(EXCEPTION_MESSAGE.INVALID_ID);
    }
    if (appeal.status !== 'In Progress') {
      throw new Error(EXCEPTION_MESSAGE.STATUS_NOT_IN_PROGRESS);
    }
    appeal.status = 'Completed';
    appeal.resolution = resolution;
    appeal.updatedAt = new Date();
    return await appeal.save();
  }

  async cancel(id: string, cancelReason: string): Promise<IAppeal> {
    let appeal: IAppeal | null = null;
    try {
      appeal = await Appeal.findById(id)
    } catch (error) {
      throw new Error(EXCEPTION_MESSAGE.INVALID_ID);
    }
    if (!appeal) {
      throw new Error(EXCEPTION_MESSAGE.INVALID_ID);
    }
    if (appeal.status === 'Canceled') {
      throw new Error(EXCEPTION_MESSAGE.ALREADY_CANCELED);
    }
    if (appeal.status === 'Completed') {
      throw new Error(EXCEPTION_MESSAGE.ALREADY_COMPLETED);
    }
    appeal.status = 'Canceled';
    appeal.cancelReason = cancelReason;
    appeal.updatedAt = new Date();
    return await appeal.save();
  }

  async findByDateRange(date?: string, startDate?: string, endDate?: string): Promise<IAppeal[]> {
    try {
      let query: any = {};
      if (date) {
        const start = new Date(date);
        const end = new Date(start);
        end.setDate(end.getDate() + 1);
        query.createdAt = { 
          $gte: start, 
          $lt: end 
        };
      } else if (startDate && endDate) {
        query.createdAt = { 
          $gte: new Date(startDate), 
          $lte: new Date(endDate) 
        };
      }
      return await Appeal.find(query);
    } catch (error) {
      throw new Error(EXCEPTION_MESSAGE.INVALID_QUERY);
    }
  }

  async cancelAllInProgress(cancelReason: string): Promise<number> {
    const result = await Appeal.updateMany(
      { status: 'In Progress' },
      { status: 'Canceled', cancelReason, updatedAt: new Date() }
    );
    return result.modifiedCount;
  }
}