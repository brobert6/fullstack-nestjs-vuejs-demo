import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { Estate } from './entities/estate.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class EstateSubscriber implements EntitySubscriberInterface<Estate> {
  private readonly logger = new Logger(EstateSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Estate;
  }

  beforeInsert(event: InsertEvent<Estate>): void | Promise<any> {
    this.logger.log('beforeInsert', JSON.stringify(event.entity));
  }

  afterInsert(event: InsertEvent<Estate>): void | Promise<any> {
    this.logger.log('afterInsert', JSON.stringify(event.entity));
  }
}
