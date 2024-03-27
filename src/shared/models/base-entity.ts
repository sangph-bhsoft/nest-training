import { AutoMap } from '@automapper/classes';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @CreateDateColumn()
  @AutoMap()
  created_at: Date;

  @UpdateDateColumn()
  @AutoMap()
  updated_at: Date;

  @DeleteDateColumn()
  @AutoMap()
  deleted_at: Date;
}
