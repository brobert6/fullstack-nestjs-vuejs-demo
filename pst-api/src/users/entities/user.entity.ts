import { Entity, Column, JoinTable, ManyToMany, OneToOne } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';

import { Role } from './role.entity';
import { Exclude } from 'class-transformer';
import { Agent } from 'src/agent/entities/agent.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'users' })
export class User extends AbstractEntity<User> {
  @Column({ unique: true })
  @ApiProperty({
    example: 'jane_doe@gmail.com',
    description: 'Provide the email of the user',
  })
  email: string;

  @Column()
  @ApiProperty({
    example: 'test123#@',
    description: 'Provide the password of the user',
  })
  password: string;

  @ApiProperty({
    example: 'Jane',
    description: 'Provide the first name of the user',
  })
  @Column()
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'provide the lastName of the user',
  })
  @Column()
  lastName: string;

  @Column()
  @ApiProperty({
    example: '0745654645',
    description: 'Provide the phone of the user',
  })
  phone: string;

  @Column()
  @ApiProperty({
    example: 'Address',
    description: 'Provide the address of the user',
  })
  address: string;

  @Column()
  @ApiProperty({
    example: 'City',
    description: 'Provide the city',
  })
  city: string;

  @Column()
  @ApiProperty({
    example: 'State',
    description: 'Provide the state',
  })
  state: string;

  @Column()
  @ApiProperty({
    example: '540475',
    description: 'Provide the zipcode of the user',
  })
  zipCode: string;

  @Column()
  @ApiProperty({
    example: 'Romania',
    description: 'Provide the country of the user',
  })
  country: string;

  @Column({ nullable: true })
  apiKey: string;

  @Column({ default: true })
  @Exclude()
  active: boolean;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable()
  roles: Role[];

  @OneToOne(() => Agent, { cascade: true, nullable: true })
  agent: Agent | null;
}
