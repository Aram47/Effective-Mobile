import { IAppeal } from '../models/appeal-model.js';

export interface IAppealRepository {
  create(subject: string, description: string): Promise<IAppeal>;
  startProcessing(id: string): Promise<IAppeal>;
  complete(id: string, resolution: string): Promise<IAppeal>;
  cancel(id: string, cancelReason: string): Promise<IAppeal>;
  findByDateRange(date?: string, startDate?: string, endDate?: string): Promise<IAppeal[]>;
  cancelAllInProgress(cancelReason: string): Promise<number>;
}