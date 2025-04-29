import { Request } from "express";
import { IAppeal } from "../models/appeal-model.js";
import { IAppealRepository } from "../repositories/iappeal-repository.js";

export class AppealService {
  constructor(private readonly iappealRepository: IAppealRepository) {}

  async create(req: Request): Promise<IAppeal> {
    return await this.iappealRepository.create(req.body.subject, req.body.description);
  }
  
  async startProcessing(req: Request): Promise<IAppeal> {
    const id: string = req.params.id.split('=')[1];
    return await this.iappealRepository.startProcessing(id);
  }
  
  async complete(req: Request): Promise<IAppeal> {
    const id: string = req.params.id.split('=')[1];
    return await this.iappealRepository.complete(id, req.body.resolution);
  }
  
  async cancel(req: Request): Promise<IAppeal> {
    const id: string = req.params.id.split('=')[1];
    return await this.iappealRepository.cancel(id, req.body.cancelReason);
  }
  
  async list(req: Request): Promise<IAppeal[]> {
    return await this.iappealRepository
      .findByDateRange(req.body.date, 
        req.body.startDate, 
        req.body.endDate);
  }
  
  async cancelAllInProgress(req: Request): Promise<number> {
    return await this.iappealRepository.cancelAllInProgress(req.body.cancleReason);
  }
}