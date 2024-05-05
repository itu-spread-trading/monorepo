import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenEntity } from 'src/entities/token.entity';
import { IndexerController } from 'src/indexer/indexer.controller';
import { IndexerService } from 'src/indexer/indexer.service';

@Module({
  imports: [ScheduleModule.forRoot(), TypeOrmModule.forFeature([TokenEntity])],
  controllers: [IndexerController],
  providers: [IndexerService],
})
export class IndexerModule {}
