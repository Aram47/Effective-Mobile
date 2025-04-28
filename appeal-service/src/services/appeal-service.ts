import { Request } from "express";
import { IAppeal } from "../models/appeal-model.js";
import { IAppealRepository } from "../repositories/iappeal-repository.js";

export class AppealService {
  constructor(private readonly iappealRepository: IAppealRepository) {}

  async create(req: Request): Promise<IAppeal> {
    return await this.iappealRepository.create('subject', 'description');
  }
  
  async startProcessing(req: Request): Promise<IAppeal> {
    return await this.iappealRepository.startProcessing('id');
  }
  
  async complete(req: Request): Promise<IAppeal> {
    return await this.iappealRepository.complete('id', 'resolution');
  }
  
  async cancel(req: Request): Promise<IAppeal> {
    return await this.iappealRepository.cancel('id', 'cancleReason');
  }
  
  async list(): Promise<IAppeal[]> {
    return await this.iappealRepository.findByDateRange();
  }
  
  async cancelAllInProgress(): Promise<number> {
    return await this.iappealRepository.cancelAllInProgress('cancleReason');
  }
}