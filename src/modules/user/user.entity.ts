import { AutoMap } from '@automapper/classes';
import { Role } from '@modules/auth/models/role.enum';
import { BaseEntity } from '@shared/models/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @AutoMap()
  @Column({ unique: true })
  username: string;

  @AutoMap()
  @Column({ unique: true })
  email: string;

  @Column()
  @AutoMap()
  password: string;

  @Column({
    nullable: true,
  })
  @AutoMap()
  phone: string;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;
}
