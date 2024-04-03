import { Module } from '@nestjs/common';
import { EstatesService } from './estates.service';
import { EstatesController } from './estates.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estate } from './entities/estate.entity';
import { Comment } from './entities/comment.entity';
import { EstateSubscriber } from './estate.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Estate, Comment])],
  controllers: [EstatesController],
  providers: [EstatesService, EstateSubscriber],
})
export class EstatesModule {}
