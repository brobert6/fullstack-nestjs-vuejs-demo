import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('agents')
export class Agent extends AbstractEntity<Agent> {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text', nullable: true })
  logo: string;

  @OneToOne(() => User, (user) => user.agent)
  @JoinColumn()
  user: User;
}
