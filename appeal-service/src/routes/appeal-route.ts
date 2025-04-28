import { Router } from 'express';
import { AppealMiddleware } from '../middlewares/appeal-middleware.js';
import { IAppealRepository } from '../repositories/iappeal-repository.js';
import { AppealController } from '../controllers/appeal-controller.js';
import { AppealService } from '../services/appeal-service.js';
import { AppealRepository } from '../repositories/appeal-repository.js';

const iappealRepository: IAppealRepository = new AppealRepository();
const appealService: AppealService = new AppealService(iappealRepository);
const appealController: AppealController = new AppealController(appealService);

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Appeals
 *   description: API для управления обращениями
 */

router.post('/', 
  AppealMiddleware.createValidation,
  appealController.create.bind(appealController)
);

router.patch('/:id/start', appealController.startProcessing.bind(appealController));

router.patch('/:id/complete', 
  AppealMiddleware.completeValidation,
  appealController.complete.bind(appealController)
);

router.patch('/:id/cancel', 
  AppealMiddleware.cancelValidation, 
  appealController.cancel.bind(appealController)
);

router.get('/', 
  AppealMiddleware.listValidation,
  appealController.list.bind(appealController)
);

router.delete('/cancel-in-progress', 
  AppealMiddleware.cancelAllInProgressValidation,
  appealController.cancelAllInProgress.bind(appealController)
);

export default router;