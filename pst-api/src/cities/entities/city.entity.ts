import { AbstractEntity } from '../../database/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'cities' })
export class City extends AbstractEntity<City> {
  @Column({ unique: true })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;
}
