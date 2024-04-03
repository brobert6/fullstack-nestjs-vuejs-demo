// Role.ts
import { Entity, Column, ManyToMany } from 'typeorm';
import { User } from './user.entity';
import { AbstractEntity } from '../../database/abstract.entity';

@Entity({ name: 'roles' })
export class Role extends AbstractEntity<Role> {
  @Column({ unique: true })
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
