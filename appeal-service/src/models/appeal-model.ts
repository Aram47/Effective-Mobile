import { DataTypes, Model, Sequelize } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

export class Appeal {
  private id: string;
  private subject: string;
  private text: string;
  private status: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(subject: string, text: string) {
    this.id = uuidv4();
    this.subject = subject;
    this.text = text;
    this.status = 'Новое';
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  getId(): string {
    return this.id;
  }

  getSubject(): string {
    return this.subject;
  }

  getText(): string {
    return this.text;
  }

  getStatus(): string {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}

export enum AppealStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class AppealModel extends Model {
  public id!: string;
  public topic!: string;
  public text!: string;
  public status!: AppealStatus;
  public resolution?: string;
  public cancellationReason?: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

export function initAppealModel(sequelize: Sequelize) {
  AppealModel.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      topic: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(...Object.values(AppealStatus)),
        defaultValue: AppealStatus.NEW,
        allowNull: false,
      },
      resolution: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      cancellationReason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'appeals',
      timestamps: true,
    }
  );
}