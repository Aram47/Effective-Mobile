import { body, query, param } from 'express-validator';

export class AppealMiddleware {
  static createValidation = [
    body('subject').notEmpty().withMessage('Subject is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ];

  static completeValidation = [
    param('id').isMongoId().withMessage('Invalid appeal ID'),
    body('resolution').notEmpty().withMessage('Resolution is required'),
  ];

  static cancelValidation = [
    param('id').isMongoId().withMessage('Invalid appeal ID'),
    body('cancelReason').notEmpty().withMessage('Cancel reason is required'),
  ];

  static listValidation = [
    query('date').optional().isISO8601().withMessage('Date must be in ISO8601 format'),
    query('startDate').optional().isISO8601().withMessage('Start date must be in ISO8601 format'),
    query('endDate').optional().isISO8601().withMessage('End date must be in ISO8601 format'),
  ];

  static cancelAllInProgressValidation = [
    body('cancelReason').notEmpty().withMessage('Cancel reason is required'),
  ];
}