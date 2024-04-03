import { AbstractEntity } from '../../database/abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Estate } from './estate.entity';

@Entity()
export class Comment extends AbstractEntity<Comment> {
  @Column()
  content: string;

  @ManyToOne(() => Estate, (estate) => estate.comments)
  estate: Estate;
}
