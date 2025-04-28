import { Request, Response } from 'express';
import { AppealService } from "../services/appeal-service.js";
import { IAppeal } from '../models/appeal-model.js';

export class AppealController {
  constructor(private readonly appealService: AppealService) {}

  /**
   * @swagger
   * /appeals:
   *   post:
   *     summary: Создать новое обращение
   *     tags: [Appeals]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - subject
   *               - description
   *             properties:
   *               subject:
   *                 type: string
   *                 description: Тема обращения
   *               description:
   *                 type: string
   *                 description: Описание обращения
   *     responses:
   *       201:
   *         description: Обращение успешно создано
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Appeal'
   *       400:
   *         description: Ошибка валидации
   *       500:
   *         description: Внутренняя ошибка сервера
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const appeal: IAppeal = await this.appealService.create(req);
      res.status(200).json(appeal);
    } catch (error) {
      res.status(500).json({ message: 'message from constants' });
    }
  }

  /**
 * @swagger
 * /appeals/{id}/start:
 *   patch:
 *     summary: Взять обращение в работу
 *     tags: [Appeals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID обращения
 *     responses:
 *       200:
 *         description: Обращение переведено в статус "В работе"
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Appeal'
 *       400:
 *         description: Неверный ID или недопустимый статус
 *       404:
 *         description: Обращение не найдено
 */
  async startProcessing(req: Request, res: Response): Promise<void> {
    try {
      const appeal: IAppeal = await this.appealService.startProcessing(req);
      res.status(200).json(appeal);
    } catch (error) {
      res.status(500).json({ message: 'message from constants' });
    }
  }

  /**
   * @swagger
   * /appeals/{id}/complete:
   *   patch:
   *     summary: Завершить обращение
   *     tags: [Appeals]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID обращения
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - resolution
   *             properties:
   *               resolution:
   *                 type: string
   *                 description: Решение по обращению
   *     responses:
   *       200:
   *         description: Обращение завершено
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Appeal'
   *       400:
   *         description: Ошибка валидации или недопустимый статус
   *       404:
   *         description: Обращение не найдено
   */
  async complete(req: Request, res: Response): Promise<void> {
    try {
      const appeal: IAppeal = await this.appealService.complete(req);
      res.status(200).json(appeal);
    } catch (error) {
      res.status(500).json({ message: 'message from constants' });
    }
  }

  /**
   * @swagger
   * /appeals/{id}/cancel:
   *   patch:
   *     summary: Отменить обращение
   *     tags: [Appeals]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID обращения
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - cancelReason
   *             properties:
   *               cancelReason:
   *                 type: string
   *                 description: Причина отмены
   *     responses:
   *       200:
   *         description: Обращение отменено
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Appeal'
   *       400:
   *         description: Ошибка валидации или недопустимый статус
   *       404:
   *         description: Обращение не найдено
   */
  async cancel(req: Request, res: Response): Promise<void> {
    try {
      const appeal: IAppeal = await this.appealService.cancel(req);
      res.status(200).json(appeal);
    } catch (error) {
      res.status(500).json({ message: 'message from constants' });
    }
  }

  /**
   * @swagger
   * /appeals:
   *   get:
   *     summary: Получить список обращений
   *     tags: [Appeals]
   *     parameters:
   *       - in: query
   *         name: date
   *         schema:
   *           type: string
   *           format: date
   *         description: Фильтр по конкретной дате (например, 2025-04-28)
   *       - in: query
   *         name: startDate
   *         schema:
   *           type: string
   *           format: date
   *         description: Начало диапазона дат
   *       - in: query
   *         name: endDate
   *         schema:
   *           type: string
   *           format: date
   *         description: Конец диапазона дат
   *     responses:
   *       200:
   *         description: Список обращений
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Appeal'
   *       400:
   *         description: Ошибка валидации параметров
   *       500:
   *         description: Внутренняя ошибка сервера
   */
  async list(req: Request, res: Response): Promise<void> {
    try {
      const appeals: IAppeal[] = await this.appealService.list();
      res.status(200).json(appeals);
    } catch (error) {
      res.status(500).json({ message: 'message from constants' });
    }
  }

  /**
 * @swagger
 * /appeals/cancel-in-progress:
 *   patch:
 *     summary: Отменить все обращения в статусе "В работе"
 *     tags: [Appeals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cancelReason
 *             properties:
 *               cancelReason:
 *                 type: string
 *                 description: Причина отмены
 *     responses:
 *       200:
 *         description: Количество отмененных обращений
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 modifiedCount:
 *                   type: integer
 *                   description: Количество измененных обращений
 *       400:
 *         description: Ошибка валидации
 *       500:
 *         description: Внутренняя ошибка сервера
 */
  async cancelAllInProgress(req: Request, res: Response): Promise<void> {
    try {
      const canceledCount: number = await this.appealService.cancelAllInProgress();
      res.status(200).json({ canceledCount });
    } catch (error) {
      res.status(500).json({ message: 'message from constants' });
    }
  }
}