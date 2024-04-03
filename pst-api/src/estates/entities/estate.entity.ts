import { AbstractEntity } from '../../database/abstract.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Comment } from './comment.entity';

@Entity({ name: 'estates' })
export class Estate extends AbstractEntity<Estate> {
  @Column({ unique: true })
  name: string;

  @Column()
  type: string;

  @OneToMany(() => Comment, (comment) => comment.estate, { cascade: true })
  comments: Comment[];
}
