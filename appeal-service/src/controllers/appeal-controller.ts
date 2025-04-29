import { Request, Response } from 'express';
import { AppealService } from "../services/appeal-service.js";
import { IAppeal } from '../models/appeal-model.js';
import { 
  HTTP_STATUS, 
  RESPONSE_MESSAGES, 
  EXCEPTION_MESSAGE 
} from '../constants/index.js';

export class AppealController {
  constructor(private readonly appealService: AppealService) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      const appeal: IAppeal = await this.appealService.create(req);
      res.status(HTTP_STATUS.OK).json({
        message: RESPONSE_MESSAGES.SUCCESS.CREATED,
        appeal
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
        message:  RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER
      });
    }
  }

  async startProcessing(req: Request, res: Response): Promise<void> {
    try {
      const appeal: IAppeal = await this.appealService.startProcessing(req);
      res.status(HTTP_STATUS.OK).json({
        message: RESPONSE_MESSAGES.SUCCESS.UPDATED,
        appeal
      });
    } catch (error: any) {
      if (error.message === EXCEPTION_MESSAGE.INVALID_ID) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: RESPONSE_MESSAGES.ERROR.NOT_FOUND
        });
      } else if (error.message === EXCEPTION_MESSAGE.STATUS_NOT_NEW) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: RESPONSE_MESSAGES.ERROR.ALREADY_IN_PROGRESS
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.ERROR.NOT_FOUND
        });
      }
    }
  }

  async complete(req: Request, res: Response): Promise<void> {
    try {
      const appeal: IAppeal = await this.appealService.complete(req);
      res.status(HTTP_STATUS.OK).json({
        message: RESPONSE_MESSAGES.SUCCESS.COMPLETED,
        appeal
      });
    } catch (error: any) {
      if (error.message === EXCEPTION_MESSAGE.STATUS_NOT_IN_PROGRESS) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: RESPONSE_MESSAGES.ERROR.ALREADY_COMPLETED
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          message: RESPONSE_MESSAGES.ERROR.NOT_FOUND
        });
      }
    }
  }

  async cancel(req: Request, res: Response): Promise<void> {
    try {
      const appeal: IAppeal = await this.appealService.cancel(req);
      res.status(HTTP_STATUS.OK).json({
        message: RESPONSE_MESSAGES.SUCCESS.CANCELED,
        appeal
      });
    } catch (error: any) {
      if (error.message === EXCEPTION_MESSAGE.ALREADY_CANCELED) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: RESPONSE_MESSAGES.ERROR.ALREADY_CANCELED
        });
      } else if (error.message === EXCEPTION_MESSAGE.ALREADY_COMPLETED) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: RESPONSE_MESSAGES.ERROR.ALREADY_COMPLETED
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ 
          message: RESPONSE_MESSAGES.ERROR.NOT_FOUND 
        });
      }
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const appeals: IAppeal[] = await this.appealService.list(req);
      res.status(HTTP_STATUS.OK).json({
        message: RESPONSE_MESSAGES.SUCCESS.LIST_FETCHED,
        appeals
      });
    } catch (error: any) {
      if (error.message === EXCEPTION_MESSAGE.INVALID_QUERY) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message: RESPONSE_MESSAGES.ERROR.VALIDATION_ERROR
        });
      } else {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
          message: RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER
        });
      }
    }
  }

  async cancelAllInProgress(req: Request, res: Response): Promise<void> {
    try {
      const canceledCount: number = await this.appealService.cancelAllInProgress(req);
      res.status(HTTP_STATUS.OK).json({
        message: RESPONSE_MESSAGES.SUCCESS.CANCELLED_ALL_IN_PROGRESS, 
        canceledCount
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
        message: RESPONSE_MESSAGES.ERROR.INTERNAL_SERVER
      });
    }
  }
}